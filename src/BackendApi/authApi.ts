const BASE_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


export const createUser = async (User: { name: string; email: string; password: string; }) => {

 try {
    const response = await axiosInstance.post('/register-user', User);
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


export const loginUser = async(User: { email: string;
   password: string; })=>{
 try {
    const response = await axiosInstance.post('/login-user', User);
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
}

export const verifyUserlogin = async()=>{

try {
    const response = await axiosInstance.get('/verify-login');
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
}

export const logoutUser = async()=>{

   try {
    const response = await axiosInstance.post('/logout-user');
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
}

