"use client";

import { useEffect, useState } from "react";
import { GetStore } from "../store-actions";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const StoreDetails = ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const [store, setStore] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStore = await GetStore(storeId);
        setStore(fetchedStore);
      } catch (error) {
        console.error("Failed to fetch store details:", error);
      }
    };

    fetchData();
  }, [storeId]);

  if (!store) return <div>Loading...</div>;

  return (
    <div className="p-4 text-xl">
      <div className="flex justify-between">
        <h1 className="mb-4">STORE DETAILS</h1>

        <Link className="underline text-blue-500" href="/">
          Back to Home
        </Link>
      </div>
      <div>
        Store Name: <span className="font-bold">{store.name}</span>
      </div>
      <div>Created At: {formatDate(store.createdAt)}</div>
      <div>Updated At: {formatDate(store.updatedAt)}</div>
    </div>
  );
};

export default StoreDetails;
