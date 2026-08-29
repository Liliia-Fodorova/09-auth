"use client";

import Image from "next/image";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import type { User } from "@/types/user";

type ProfileClientProps = {
  user: User;
};

export default function ProfileClient({ user }: ProfileClientProps) {
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
    </>
  );
}