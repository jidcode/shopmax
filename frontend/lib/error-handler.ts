"use server";

import { toast } from "react-toastify";

const handleError = (
  error: any,
  options = { showToast: true, logError: true }
) => {
  let errorMessage = "An unexpected error occurred. Please try again.";

  if (options.logError) {
    console.error("Error:", error);
  }

  if (error.response) {
    // Server responded with a status code outside 2xx
    const { status, data } = error.response;
    switch (status) {
      case 400:
        errorMessage = "Invalid input. Please check your data and try again.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please log in and try again.";
        break;
      case 403:
        errorMessage = "You don't have permission to perform this action.";
        break;
      case 404:
        errorMessage = "The requested resource was not found.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      default:
        errorMessage = data?.message || "An unknown error occurred.";
    }
  } else if (error.request) {
    // No response received from the server
    errorMessage =
      "No response received from the server. Please check your connection.";
  } else {
    // Other types of errors (e.g., network errors, client-side errors)
    errorMessage = error.message || errorMessage;
  }

  if (options.showToast) {
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  // Optional: Report to an error tracking service (e.g., Sentry)
  // Sentry.captureException(error);

  throw new Error(errorMessage);
};

export default handleError;
