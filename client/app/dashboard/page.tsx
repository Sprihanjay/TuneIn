"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { data } from "@/lib/constants";
import SignOutButton from "../components/signout/signout";

export default function Dashboard() {
  const [query, setQuery] = useState<string>("");

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

  const cards = data.map((card, index) => (
    <Card key={index} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      {/* Deleted after we add navbar */}
      <div className="bg-orange-500">
        <SignOutButton />
      </div>
      <div className="bg-customfive">
        <h2 className="pt-16 max-w-7xl mx-auto text-3xl md:text-5xl font-bold font-customfive font-sans text-center">
          Featured Gigs/Opportunities
        </h2>
        <div className="py-8">
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
