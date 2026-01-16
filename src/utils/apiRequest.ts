// utils/apiRequest.ts
import { toast } from "react-hot-toast";

// Update API URL to local host
// const API_URL = "http://localhost:3000";
const API_URL = "https://buzzthrillz-backend.onrender.com";

type ApiOptions = {
  method?: string;
  body?: Record<string, any>;
  token?: string;
  showSuccess?: boolean;
  showLoader?: boolean;
};

type ApiResponse<T = any> = {
  success: boolean;
  data: T | null;
};

export const apiRequest = async <T = any>(
  endpoint: string,
  { method = "GET", body, token, showLoader = false, showSuccess = false }: ApiOptions = {}
): Promise<ApiResponse<T>> => {
  let toastId: string | undefined;
  if (showLoader) {
    toastId = toast.loading("Please wait...");
  }

  try {
    const authToken = token || localStorage.getItem("auth-token");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authToken) headers.Authorization = `Bearer ${authToken}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await response.json();

    if (showLoader && toastId) toast.dismiss(toastId);

    if (!response.ok) {
      toast.error(data.msg || data.message || "Something went wrong!");
      return { success: false, data };
    }

    if (showSuccess && (data.msg || data.message)) {
      toast.success(data.msg || data.message);
    }

    return { success: true, data };
  } catch (error) {
    if (showLoader && toastId) toast.dismiss(toastId);
    toast.error("Network error! Please try again.");
    console.error("API Error:", error);
    return { success: false, data: null };
  }
};

