const BASE_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


export const getProjects = async () => {

 try {
    const response = await axiosInstance.get('/projects');
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || `HTTP error! Status: ${error.response?.status}`;
      console.error("Error adding task:", errorMessage);
      throw new Error(errorMessage);
    }
    console.error("Error adding task:", error);
    throw error;
  }
    
};
