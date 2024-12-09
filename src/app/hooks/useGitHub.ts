/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { GitHubUser, Repository } from "@/types/github";
import { fetchUser, fetchRepos } from "@/app/api/github";

export const useGitHub = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async (username: string) => {
    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const fetchedUser = await fetchUser(username);
      setUser(fetchedUser);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async (username: string) => {
    setLoading(true);
    setError(null);

    try {
      const [fetchedUser, fetchedRepos] = await Promise.all([
        fetchUser(username),
        fetchRepos(username),
      ]);
      setUser(fetchedUser);
      setRepos(fetchedRepos);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    repos,
    loading,
    error,
    searchUser,
    getUserDetails,
  };
};
