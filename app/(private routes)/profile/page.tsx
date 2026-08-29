import type { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";
import ProfileClient from "./ProfileClient";
import css from "./ProfilePage.module.css";

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
        <ProfileClient user={user} />
      </div>
    </main>
  );
}