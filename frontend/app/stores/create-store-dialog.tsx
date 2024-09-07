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
import { CreateStore } from "./store-actions";
import { useRefresh } from "@/hooks/useRefresh";
import handleError from "@/lib/error-handler";

export type StoreInput = {
  name: string;
};

export default function CreateStoreDialog() {
  const refresh = useRefresh();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreInput>();

  const onSubmit = async (data: StoreInput) => {
    try {
      const response = await CreateStore(data);
      refresh("/stores");

      console.log(response);
      setOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">+ Create Store</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create New Store</DialogTitle>
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
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
