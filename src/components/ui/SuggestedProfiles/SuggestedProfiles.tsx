"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./SuggestedProfiles.module.css";
import { useGetUsers } from "@/hooks/useUser";
import { User as UserIcon } from "lucide-react";

type SuggestedProfilesProps = {
  currentUserId?: number;
  currentProfileId?: number;
};

export default function SuggestedProfiles({
  currentUserId,
  currentProfileId,
}: SuggestedProfilesProps) {
  const { data, isLoading, isError } = useGetUsers();
  const users = data?.data ?? [];

  if (isLoading) {
    return (
      <aside className={styles.suggested_profiles_container}>
        <h3>Perfis para seguir</h3>
        <p>Carregando...</p>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className={styles.suggested_profiles_container}>
        <h3>Perfis para seguir</h3>
        <p>Não foi possível carregar.</p>
      </aside>
    );
  }
  
  const filteredUsers = users
    .filter(
      (user: any) =>
        user.id !== currentUserId && user.id !== currentProfileId
    )
    .slice(0, 5);

  return (
    <aside className={styles.suggested_profiles_container}>
      <h3>Perfis para seguir</h3>

      {filteredUsers.length === 0 && <p>Nenhum perfil sugerido.</p>}

      {filteredUsers.map((user: any) => (
        <Link
          key={user.id}
          href={`/users/${user.username}`}
          className={styles.user_suggested_row}
        >
          {user.profilePicture ? (
            <Image
              width={42}
              height={42}
              src={user.profilePicture}
              alt={`${user.username} photo`}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <div className={styles.placeholder}>
              <UserIcon size={22} color="white" />
            </div>
          )}

          <div className={styles.user_info}>
            <p>{user.displayName}</p>
            <p>@{user.username}</p>
          </div>
        </Link>
      ))}
    </aside>
  );
}
