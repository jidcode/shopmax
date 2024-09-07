"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { UpdateStore } from "./store-actions";
import { useSWRConfig } from "swr";

export type StoreInput = {
  name: string;
};

export default function EditStoreDialog({ storeId }: { storeId: string }) {
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreInput>();

  const onSubmit = async (data: StoreInput) => {
    const response = await UpdateStore(storeId, data);
    mutate("/stores");

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit store</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit store details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Store Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Store name is required" })}
              placeholder="Enter store name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full bg-black text-white">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
