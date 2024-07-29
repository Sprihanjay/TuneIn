"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Tabs } from "../components/ui/tabs";
import { db } from "@/lib/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import useAuth from "@/lib/hooks/useAuth";
import { HostedCard } from "../components/ui/apple-cards-carousel";
import { AppliedCard } from "../components/ui/apple-cards-carousel";

export default function Profile() {
  const tabs = [
    {
      title: "Applied",
      value: "applied",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-customtwo to-zinc-800">
          <p>Applied Tab</p>
          <Applied />
        </div>
      ),
    },
    {
      title: "Hosted",
      value: "hosted",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-zinc-800 to-customtwo">
          <p>Hosted tab</p>
          <Hosted />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-customone min-h-screen h-full md:h-[40rem] [perspective:1000px] relative flex flex-col mx-auto w-full items-start justify-start px-10 pb-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const Applied = () => {
  const [appliedItems, setAppliedItems] = useState<any[]>([]);
  const user = useAuth();

  useEffect(() => {
    const fetchAppliedItems = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const applied = userData?.applied || [];

          console.log("Found applied gigs");
          setAppliedItems(applied);
        } else {
          console.log("User document not found");
        }
      } catch (error) {
        console.error("Error fetching applied items:", error);
      }
    };

    fetchAppliedItems();
  }, [user]); // Add `user` as a dependency

  return (
    <>
      {appliedItems.length > 0 ? (
        <div>
          {appliedItems.map((item, index) => (
            <div key={index} className="mb-4">
              <AppliedCard eventId={item} userId={user.uid} />
            </div>
          ))}
        </div>
      ) : (
        <p>No applied items yet.</p>
      )}
    </>
  );
};

const Hosted = () => {
  const [hostedItems, setHostedItems] = useState<any[]>([]);
  const [hostedPosts, setHostedPosts] = useState<any[]>([]);
  const user = useAuth();

  useEffect(() => {
    const fetchHostedItems = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const hosted = userData?.hosted || [];

          console.log("Found applied gigs");
          setHostedItems(hosted);
        } else {
          console.log("User document not found");
        }
      } catch (error) {
        console.error("Error fetching applied items:", error);
      }
    };

    fetchHostedItems();
  }, [user]); // Add `user` as a dependency

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const posts = [];
        for (const postId of hostedItems) {
          const postDocRef = doc(db, "posts", postId);
          const postDoc = await getDoc(postDocRef);

          if (postDoc.exists()) {
            posts.push({ id: postDoc.id, ...postDoc.data() });
          } else {
            console.log(`Post document with ID ${postId} not found`);
          }
        }
        setHostedPosts(posts);
      } catch (error) {
        console.error("Error fetching hosted posts:", error);
      }
    };

    if (hostedItems.length > 0) {
      fetchPostDetails();
    }
  }, [hostedItems]);

  return (
    <>
      {hostedPosts.length > 0 ? (
        <div className="carousel">
          {hostedPosts.map((post, index) => (
            <HostedCard
              key={index}
              card={post}
              postId={hostedItems[index]}
              index={index}
            />
          ))}
        </div>
      ) : (
        <p>No hosted items yet.</p>
      )}
    </>
  );
};
