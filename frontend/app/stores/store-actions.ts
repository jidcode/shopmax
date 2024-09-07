"use server";

import api from "@/services/api";
import { revalidatePath } from "next/cache";
import { StoreInput } from "./create-store-dialog";

export const GetStore = async (storeId: string) => {
  try {
    const response = await api.get(`/stores/${storeId}`);
    revalidatePath("/");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch store:", error);
  }
};

export const CreateStore = async (data: StoreInput) => {
  try {
    const response = await api.post("/stores", data);
    const stores = response.data;

    revalidatePath("/");
    return stores;
  } catch (error) {
    console.error("Failed to create store:", error);
  }
};

export const UpdateStore = async (id: string, data: StoreInput) => {
  try {
    const response = await api.put(`/stores/${id}`, data);
    const stores = response.data;

    revalidatePath("/");
    return stores;
  } catch (error) {
    console.error("Failed to update store:", error);
  }
};

export const DeleteStore = async (id: string) => {
  try {
    const response = await api.delete(`/stores/${id}`);
    const stores = response.data;

    revalidatePath("/");
    return stores;
  } catch (error) {
    console.error("Failed to delete store", error);
  }
};
