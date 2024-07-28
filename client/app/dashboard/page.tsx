"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { data } from "@/lib/constants";
import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "@/lib/firebase/clientApp";
import { Content } from "next/font/google";
import { getDownloadURL, ref } from "firebase/storage";

export default function Dashboard() {
  const [query, setQuery] = useState<string>("");
  const [postList, setPostList] = useState<any[]>([]);
  const placeholders = ["Search for a gig/opportunity..."];

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
    <Card key={index} card={card} index={index} />
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
