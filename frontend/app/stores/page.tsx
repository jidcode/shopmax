"use client";

import useSWR from "swr";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function PostComponent() {
  const { data: posts, error } = useSWR(`/notes`, fetcher);

  if (error) return <div role="alert">Failed to load posts</div>;
  if (!posts) return <div aria-live="polite">Loading...</div>;

  return (
    <div className="m-4">
      <h1>POSTS</h1>

      <ul>
        {posts.map((post) => (
          <li className="py-4 border-b" key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
