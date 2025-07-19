// GitHub API response types
export interface GitHubUser {
  login: string;
  avatar_url: string;
  contributions?: number;
}

export interface GitHubRepository {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  language: string | null;
  owner: GitHubUser;
}

export interface RepositoryData extends GitHubRepository {
  languages: Record<string, number>;
  contributors: GitHubUser[];
  contributorCount: number;
}

export type ButtonState = "initial" | "generating" | "generated";
