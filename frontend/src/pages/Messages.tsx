import Navbar from "@/components/navbar/Navbar";
import MessageCard from "@/components/messages/MessageCard";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { FormEvent, useEffect, useState, useRef } from "react";
import api from "@/api";

const firebaseConfig = {
  apiKey: "AIzaSyBUVG6PG26njfCXp7MoChNqxrMMqhx5zHQ",
  authDomain: "parrot-application-10e55.firebaseapp.com",
  projectId: "parrot-application-10e55",
  storageBucket: "parrot-application-10e55.appspot.com",
  messagingSenderId: "573099359331",
  appId: "1:573099359331:web:82e0d022409a4ecaf84c56",
  measurementId: "G-JYPXS3MQ1K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  school: string;
  major: string;
  bio: string;
  profile_picture: string;
  resume: string;
  linkedin: string;
  github: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // One time fetch of profile data
  useEffect(() => {
    api.get("api/profiles/").then((res) => {
      setProfileData(res.data[0]);
      console.log(res.data[0]);
    });

  
  }, []);

  // Realtime listener to messages
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedMessages: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        updatedMessages.push(doc.data());
      });

      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    console.log(profileData && profileData.profile_picture);

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        uid: profileData?.id,
        message: formValue,
        timestamp: new Date(),
        photoUrl: profileData?.profile_picture,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setFormValue("");
  };

  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <div className="flex flex-col items-center bg-slate-50">
          <div className="w-full max-w-[1000px] lg:p-7 p-5">
            <div className="bg-white h-messages rounded-xl shadow-light p-5">
              <h1 className="text-lg text-primary font-medium border-b pb-3">
                Messages
              </h1>

              <div className="grid grid-cols-[19rem_auto] h-full">
                <div></div>

                <div className="relative border-l h-messages-r overflow-scroll">
                  <div className="flex flex-col gap-5 h-messages-r-1 overflow-scroll">
                    {messages.map((message: DocumentData, index) => (
                      <MessageCard message={message} key={index} />
                    ))}

                    <span ref={dummy}></span>
                  </div>

                  <div className="absolute bottom-0 w-full border-t bg-white p-4 pr-0">
                    <form onSubmit={handleSendMessage} className="flex gap-x-5">
                      <input
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        placeholder="Enter Message"
                        className="w-full border-none bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                      />

                      <button type="submit" disabled={!formValue} className="bg-card-green w-20 text-white rounded-lg disabled:bg-gray-300">
                        Enter
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
