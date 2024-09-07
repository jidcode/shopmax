"use client";

import { logoutUser } from "./(auth)/auth-actions";
import { useRouter } from "next/navigation";
import StoreList from "./stores/store-list";
import { fetcher } from "@/services/api";
import useSWR from "swr";

export interface StoreProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const App = () => {
  const router = useRouter();

  const { data: stores, error } = useSWR<StoreProps[]>(`/stores`, fetcher);

  if (error) {
    console.log(error);
    return <div role="alert">Failed to load stores</div>;
  }

  if (!stores) return <div aria-live="polite">Loading...</div>;

  console.log(stores);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <main className="m-4 lg:mx-40">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">HOME</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <StoreList stores={stores} />
    </main>
  );
};

export default App;
