"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { useEffect } from 'react';
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
declare const gapi: any;


import "./style.css";
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  use,
  useState,
} from "react";
import {
  collection,
  doc,
  getCountFromServer,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase/clientApp";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import useBoundState from "./bound-state";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";

type THeaderProps = {
  text: string;
};

const Header = ({ text }: THeaderProps) => {
  return (
    <>
      <div className="font-bold text-2xl mt-2 text-customfive">{text}</div>
      <div className="w-full border-b-2 border-customthree mb-2"></div>
    </>
  );
};

enum EFileType {
  Audio,
  Image,
}

type TFileItemProps = {
  file: File;
  fileType: EFileType;
};

const FileItem = ({ file, fileType }: TFileItemProps) => {
  const sampleImage = `https://plus.unsplash.com/premium_photo-1722002219049-1c41e1a034c8?q=80&w=1848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
  const user = useAuth();
  return (
    <div className="w-48 h-48 flex justify-center items-center bg-white rounded-lg border-2">
      {fileType === EFileType.Image ? (
        <img
          src={URL.createObjectURL(file)}
          alt="Picture"
          className="w-48 h-48 object-cover rounded-lg"
        />
      ) : (
        <div className="flex flex-col item-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            color="#000000"
            fill="none"
            className="mx-auto"
          >
            <circle
              cx="6.5"
              cy="18.5"
              r="3.5"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <circle
              cx="18"
              cy="16"
              r="3"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M10 18.5L10 7C10 6.07655 10 5.61483 10.2635 5.32794C10.5269 5.04106 11.0175 4.9992 11.9986 4.91549C16.022 4.57222 18.909 3.26005 20.3553 2.40978C20.6508 2.236 20.7986 2.14912 20.8993 2.20672C21 2.26432 21 2.4315 21 2.76587V16"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 10C15.8667 10 19.7778 7.66667 21 7"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="px-2 w-48 text-center truncate text-ellipsis">
            {file.name}
          </div>
        </div>
      )}
    </div>
  );
};

const FileUploadButton = ({
  uploadFile,
}: {
  uploadFile: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div>
      <label
        htmlFor="file-input"
        className="w-48 h-48 bg-customfour flex justify-center items-center rounded-lg text-black border-dotted border-2 border-black cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="32"
          height="32"
          color="#000000"
          fill="none"
        >
          <path
            d="M12 4.5L12 14.5M12 4.5C11.2998 4.5 9.99153 6.4943 9.5 7M12 4.5C12.7002 4.5 14.0085 6.4943 14.5 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>Upload</div>
      </label>
      <input
        id="file-input"
        type="file"
        className="hidden"
        onChange={uploadFile}
      />
    </div>
  );
};

const PostForm = () => {
  const user = useAuth();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Add a description to this posting...",
      }),
    ],
    content: "",
    onUpdate({ editor }) {
      setDesc(editor.getText());
    },
  });

  const router = useRouter();
  const [files, setFiles] = useState<TFileItemProps[]>([]);
  const [title, titleBinding, setTitleState] = useBoundState("");
  const [content, contentBinding, setContentState] = useBoundState("");
  const [desc, setDesc] = useState<string>();
  const [eventDate, setEventDate] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("");

  const determineFileType = (file: File) => {
    const name = file.type.toLowerCase();
    if (name.includes("jpeg") || name.includes("png") || name.includes("jpg")) {
      return EFileType.Image;
    } else if (
      name.includes("mpeg") ||
      name.includes("wav") ||
      name.includes("ogg") ||
      name.includes("aac")
    ) {
      return EFileType.Audio;
    }

    throw new Error("File is not supported.");
  };

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const tmp: TFileItemProps[] = [];
    if (!event.target.files) return;

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files.item(i);
      if (!file) continue;

      try {
        const type = determineFileType(file);
        tmp.push({
          file,
          fileType: type,
        });
      } catch (e) {
        console.log(
          `${file.name} was not processed because file could not be supported.`
        );
        continue;
      }
    }

    setFiles([...tmp, ...files]);
  };

  const addFileToStorage = async (file: TFileItemProps, fileName: string) => {
    try {
      if (file.fileType === EFileType.Audio) {
        const audioRef = ref(storage, `audio/${fileName}`);
        await uploadBytes(audioRef, file.file);
      } else if (file.fileType === EFileType.Image) {
        const imagesRef = ref(storage, `images/${fileName}`);
        await uploadBytes(imagesRef, file.file);
      }
      return true;
    } catch (error) {
      console.error("Error uploading file to storage", error);
      return false;
    }
  };

  const initializeGapi = () => {
    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.events',
      });
    });
  };
  
  useEffect(() => {
    initializeGapi();
  }, []);

  const createPost = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default form submission if necessary

    // Save post in Firestore
    const postRef = collection(db, "posts");
    const newPostDocRef = doc(postRef);
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      const userHosted = userData.hosted || [];
      const updatedUserHosted = [...userHosted, newPostDocRef.id];

      const savedFileNames: string[] = [];
      // Save files to storage
      for (const file of files) {
        const fileName = `${file.file.name}_${v4()}`;
        savedFileNames.push(fileName);
        await addFileToStorage(file, fileName);
      }

      await setDoc(newPostDocRef, {
        title,
        desc,
        files: savedFileNames,
        content,
        applied: [],
      });

      await updateDoc(userDocRef, { hosted: updatedUserHosted });

      // Create Google Calendar Event
      const eventDateTime = new Date(`${eventDate}T${eventTime}:00`);
      const googleEvent = {
        summary: title,
        description: desc,
        start: {
          dateTime: eventDateTime.toISOString(),
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: new Date(eventDateTime.getTime() + 60 * 60 * 1000).toISOString(),
          timeZone: "America/Los_Angeles",
        },
      };

      try {
        await gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: googleEvent,
        });
      } catch (error) {
        console.error("Error creating Google Calendar event", error);
      }

      try {
        await gapi.auth2.getAuthInstance().signIn();
        const response = await gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: googleEvent,
        });
        console.log("Event created:", response);
      } catch (error) {
        console.error("Error creating Google Calendar event", error);
      }

      router.push("/"); // Which Page should I return to?
  };

  const goBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div
        onClick={goBack}
        className="text-white mb-2 cursor-pointer w-1/2 float-left"
      >
        {"< Back"}
      </div>
      <div className="bg-customtwo w-1/2 px-10 h-11/12 py-4 rounded-lg">
        <Header text="Post Title"></Header>
        <input
          ref={titleBinding}
          className="bg-customthree text-customfive p-3 rounded-lg w-full"
          name="title"
          placeholder="Add title post..."
        ></input>
        <Header text="Description"></Header>
        <EditorContent
          className="bg-customthree text-customfive p-3 rounded-lg outline-none border-none shadow-none border-0"
          editor={editor}
        />
        <Header text="Content"></Header>
        <input
          ref={contentBinding}
          className="bg-customthree text-customfive p-3 rounded-lg w-full"
          name="content"
          placeholder="Add content text..."
        ></input>
        <Header text="Event Date"></Header>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="bg-customthree text-customfive p-3 rounded-lg w-full"
        />
        <Header text="Event Time"></Header>
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          className="bg-customthree text-customfive p-3 rounded-lg w-full"
        />
        <Header text="Inspiration"></Header>
        <div className="w-full flex gap-4">
          <FileUploadButton uploadFile={uploadFile}></FileUploadButton>
          {files.map((item) => (
            <FileItem
              file={item.file}
              fileType={item.fileType}
              key={item.file.name}
            ></FileItem>
          ))}
        </div>
        <div className="w-full flex justify-center mt-6">
          <button
            className="text-customone bg-customfour p-2 rounded-lg font-semibold"
            onClick={createPost}
          >
            Create post
          </button>
        </div>
      </div>
    </div>
  );
};
};
export default PostForm;
