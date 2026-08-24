"use client";

import Image from "next/image";
import css from "./ProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";

export default function ProfileClient() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <div className={css.header}>
        <h1 className={css.formTitle}>Profile Page</h1>
        <Link href="/profile/edit" className={css.editProfileButton}>
          Edit Profile
        </Link>
      </div>
      <div className={css.avatarWrapper}>
        <Image
          src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          loading="eager"
        />
      </div>
      <div className={css.profileInfo}>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
      </div>
    </>
  );
}