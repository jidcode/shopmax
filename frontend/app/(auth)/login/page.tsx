"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginUser } from "../auth-actions";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const response = await loginUser(data);

    router.push("/");
    console.log(response);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className="border rounded w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <p>Don't have an account?</p>
          <Link href="/register" className="text-blue-500 underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
