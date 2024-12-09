/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { useGitHub } from "@/app/hooks/useGitHub";

export default function Home() {
  const [input, setInput] = useState("");
  const { user, loading, error, searchUser } = useGitHub();
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchUser(input);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20">
      <form className="flex w-full max-w-md gap-2" onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search GitHub User..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={classNames(
              "w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/5 border-gray-600",
              {
                "border-red-500": error,
              }
            )}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="text-red-500">{error}</div>}

      {user && (
        <div
          onClick={() => router.push(`/user/${user.login}`)}
          className="cursor-pointer "
        >
          <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-gray-600 hover:border-blue-500 transition-all rounded-lg p-6 flex items-center gap-6 cursor-pointer hover:bg-white/20">
            <Image
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className="w-24 h-24 rounded-full"
              width={96}
              height={96}
            />
            <div>
              <h2 className="text-xl font-semibold">
                {user.name || user.login}
              </h2>
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
        </div>
      )}
    </div>
  );
}
