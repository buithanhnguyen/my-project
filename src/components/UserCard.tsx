import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GitHubUser } from "@/types/github";

interface UserCardProps {
  user: GitHubUser;
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-gray-600 hover:border-blue-500 transition-all rounded-lg p-6 flex items-center gap-6 cursor-pointer hover:bg-white/20"
    >
      <Image
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="w-24 h-24 rounded-full"
        width={96}
        height={96}
      />
      <div>
        <h2 className="text-xl font-semibold">{user.name || user.login}</h2>
        <p className="text-gray-400">@{user.login}</p>
        {user.bio && <p className="mt-2 text-sm">{user.bio}</p>}
        <div className="mt-4 flex space-x-4 text-sm text-gray-300">
          <div>Repos: {user.public_repos}</div>
          <div>Followers: {user.followers}</div>
          <div>Following: {user.following}</div>
        </div>
        <Link
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-400 hover:underline text-sm"
        >
          View Profile on GitHub
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
