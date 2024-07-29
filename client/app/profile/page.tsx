"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Tabs } from "../components/ui/tabs";
import { db } from "@/lib/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import useAuth from "@/lib/hooks/useAuth";

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
          <DummyContent />
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
              {/* Render each applied item here */}
              {/* For example, you might render a card or a simple div */}
              <p>{item}</p> {/* Replace this with actual item details */}
            </div>
          ))}
        </div>
      ) : (
        <p>No applied items yet.</p>
      )}
    </>
  );
};

const DummyContent = () => {
  return (
    <Image
      src="/TestImage.jpg"
      alt="dummy image"
      width={1000}
      height={1000}
      className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
