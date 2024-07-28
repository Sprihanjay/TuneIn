"use client";

import Image from "next/image";
import { Tabs } from "../components/ui/tabs";

export default function Profile() {
  const tabs = [
    {
      title: "Applied",
      value: "applied",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Applied Tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Hosted",
      value: "hosted",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Hosted tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-customone min-h-screen h-full md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start0 px-10 pb-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/TestImage.jpg"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
