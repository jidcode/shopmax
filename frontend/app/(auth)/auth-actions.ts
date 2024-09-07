"use server";

import api from "@/services/api";
import axios from "axios";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (data: any) => {
  try {
    const response = await api.post("/account/register", data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await api.post("/account/login", data, {
      withCredentials: true,
    });

    const token = response.data.token;
    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    cookies().delete("session");
  } catch (error) {
    console.error("Sign-out error:", error);
  }
};
