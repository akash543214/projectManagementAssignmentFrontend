const BASE_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { TaskData } from '@/types/common';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const addTask = async (projectId:string,task:any) => {

 try {
    const response = await axiosInstance.post(`/create-task/${projectId}`,task);
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



export const getTasks = async (projectId:string) => {

 try {
    const response = await axiosInstance.get(`/tasks/${projectId}`);
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


export const updateTask = async (taskId:string,task:TaskData) => {

 try {
    const response = await axiosInstance.patch(`/update-task/${taskId}`,task);
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


export const deleteTask = async (taskId:string) => {

 try {
    const response = await axiosInstance.delete(`/delete-task/${taskId}`);
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
