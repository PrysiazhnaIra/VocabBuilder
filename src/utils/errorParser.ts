interface ApiError {
  status: number;
  data: {
    message?: string;
    [key: string]: unknown;
  };
}

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "status" in error) {
    const apiError = error as ApiError;

    switch (apiError.status) {
      case 409:
        return "Email is already in use. Please log in or use a different email.";

      case 400:
        if (apiError.data?.message?.includes("Invalid credentials")) {
          return "Invalid email or password.";
        }
        return apiError.data?.message || "Invalid data format provided.";

      case 404:
        return "The requested service was not found. Please check API settings.";

      case 500:
        return "Server error. Please try again later.";

      default:
        return `An error occurred: ${apiError.status}. ${apiError.data?.message || "Please check your input."}`;
    }
  }

  return "Connection error. Check your internet connection or try again later.";
};
