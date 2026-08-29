import type { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "NoteHub Profile",
  description:
    "NoteHub is a simple and efficient application designed for managing personal notes. The app provides a clean interface for writing, editing, and browsing notes, with support for keyword search and structured organization.",
  openGraph: {
    title: "NoteHub Profile",
    description:
      "NoteHub is a simple and efficient application designed for managing personal notes. The app provides a clean interface for writing, editing, and browsing notes, with support for keyword search and structured organization.",
    url: "",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub",
      },
    ],
  },
};

export default async function Profile() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>Edit Profile
          </Link>
        </div>

       <div className={css.avatarWrapper}>
        <Image 
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          loading="eager"
          />
        </div>

        <div className={css.profileInfo}> 
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}