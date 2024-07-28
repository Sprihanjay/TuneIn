<<<<<<< HEAD

const Profile = () => {
  return <div></div>
}

export default Profile;
=======
"use client";

import Image from "next/image";
import { Tabs } from "../components/ui/tabs";
import { tabs } from "@/lib/constants";

export default function Profile() {
  return (
    <div className="bg-customone min-h-screen h-full md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start0 px-10 pb-40">
      <Tabs tabs={tabs} />
    </div>
  );
}
>>>>>>> profile
