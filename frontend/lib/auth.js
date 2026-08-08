import axios from "axios";

const API_URL = "http://localhost:8080";

export const checkUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/isUser`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Not authenticated",
    };
  }
};
