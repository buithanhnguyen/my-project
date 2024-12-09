import { GitHubUser, Repository } from "@/types/github";

export const fetchUser = async (username: string): Promise<GitHubUser> => {
  const res = await fetch(`https://api.github.com/users/${username}`);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("User not found.");
    } else {
      throw new Error("Failed to fetch user data.");
    }
  }

  return res.json();
};

export const fetchRepos = async (username: string): Promise<Repository[]> => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch repositories.");
  }

  return res.json();
};
