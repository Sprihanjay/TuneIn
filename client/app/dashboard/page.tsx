"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { data } from "@/lib/constants";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase/clientApp";
import { Content } from "next/font/google";
import { getDownloadURL, ref } from "firebase/storage";
import useAuth from "@/lib/hooks/useAuth";
import { toast, Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [query, setQuery] = useState<string>("");
  const [postList, setPostList] = useState<any[]>([]);
  const placeholders = ["Search for a gig/opportunity..."];
  const user = useAuth();

  const handleApply = async (postId: string) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentApplied = userData.applied || [];

        // Check if the postId is already in the applied array
        if (!currentApplied.includes(postId)) {
          // Add the new postId to the applied array
          const updatedApplied = [...currentApplied, postId];

          // Update the user document with the new applied array
          await updateDoc(userDocRef, { applied: updatedApplied });

          console.log(`User ${user.uid} applied for post ${postId}`);
          toast.success("Successfully applied!"); // Show success toast
        } else {
          console.log(
            `User ${user.uid} has already applied for post ${postId}`
          );
          toast.error("You have already applied for this gig!"); // Show error toast
        }
      } else {
        console.log("User document not found");
      }
    } catch (error) {
      console.error("Error applying for post:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    // Action here
  };

  useEffect(() => {
    const postRef = collection(db, "posts");
    const unsubscribe = onSnapshot(postRef, async (snapshot) => {
      if (!snapshot.empty) {
        let temp: any[] = [];

        snapshot.forEach((doc) => {
          let postData = {
            id: doc.id,
            src: doc.data().files[0],
            title: doc.data().title,
            description: doc.data().desc,
            content: doc.data().content,
          };

          temp.push(postData);
        });

        const posts = [];
        for (const item of temp) {
          const images = ref(storage, `images/${item.src}`);
          const url = await getDownloadURL(images);

          posts.push({ ...item, src: url });
        }
        setPostList(posts);
      }
    });

    return () => unsubscribe();
  }, []);

  const cards = postList.map((card, index) => (
    <Card
      key={index}
      card={card}
      index={index}
      onClick={() => handleApply(card.id)}
    />
  ));

  return (
    <div className="w-full h-full bg-customone">
      <div className="backdrop-blur-lg">
        <h2 className="pt-32 max-w-7xl mx-auto text-3xl md:text-5xl font-bold text-customfive font-sans text-center">
          Featured Gigs/Opportunities
        </h2>
        <div className="pb-12 pt-12">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      <Carousel items={cards} />
    </div>
  );
}
