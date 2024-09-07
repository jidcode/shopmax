"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { StoreProps } from "../page";
import CreateStoreDialog from "./create-store-dialog";
import Link from "next/link";
import EditStoreDialog from "./edit-store-dialog";
import { DeleteStore } from "./store-actions";
import { useSWRConfig } from "swr";

export default function StoreList({ stores }: { stores: StoreProps[] | null }) {
  const { mutate } = useSWRConfig();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async (storeId: string) => {
    try {
      await DeleteStore(storeId);
      mutate("/stores");
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-2xl font-semibold my-4">
          Stores ({stores?.length})
        </h2>
        <CreateStoreDialog />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="text-gray-400 font-bold">
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stores?.map((store) => (
            <TableRow key={store.id}>
              <TableCell className="font-medium">{store.name}</TableCell>
              <TableCell>{formatDate(store.updatedAt)}</TableCell>
              <TableCell>{formatDate(store.createdAt)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/stores/${store.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </Link>

                  <EditStoreDialog storeId={store.id} />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDelete(store.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete store</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
