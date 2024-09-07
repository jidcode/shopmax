"use server";

export const getData = async () => {
  const response = await fetch("http://localhost:5000/api/stores");

  return response.json();
};
