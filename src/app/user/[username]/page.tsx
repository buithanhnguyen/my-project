/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GitHubUser } from "@/app/page";

import ArrowIcon from "@/share/icon/arrow";
import StarIcon from "@/share/icon/star";
import ForkIcon from "@/share/icon/fork";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

async function fetchUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data.");
  }

  return res.json();
}

async function fetchRepos(username: string): Promise<Repository[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch repositories.");
  }

  return res.json();
}

const UserDetail = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;

  try {
    const [user, repos] = await Promise.all([
      fetchUser(username),
      fetchRepos(username),
    ]);

    return (
      <div className="min-h-screen p-8 sm:p-20 bg-gray-900 text-white">
        <Link
          href="/"
          className="text-blue-400 flex items-center gap-2 hover:underline mb-4"
        >
          <ArrowIcon className="w-4 h-4" /> Back to Search
        </Link>
        <div className="flex items-center gap-6 mb-8">
          <Image
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            className="w-32 h-32 rounded-full"
            width={128}
            height={128}
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
            <p className="text-gray-400">@{user.login}</p>
            {user.bio && <p className="mt-2 text-lg">{user.bio}</p>}
            <div className="mt-4 flex space-x-6">
              <div>Repos: {user.public_repos}</div>
              <div>Followers: {user.followers}</div>
              <div>Following: {user.following}</div>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-400 hover:underline"
            >
              View Profile on GitHub
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-medium">{repo.name}</h3>
              {repo.description && (
                <p className="text-gray-400">{repo.description}</p>
              )}
              <div className="mt-2 flex space-x-4 text-base items-center text-gray-300">
                <span className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 text-yellow-300 fill-yellow-300" />{" "}
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-2">
                  <ForkIcon className="w-4 h-4" /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }
};

export default UserDetail;
