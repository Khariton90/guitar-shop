import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.CONFLICT]: true,
};

const AUTO_CLOSE_TOAST = 1500;

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];
const BASE_URL = 'http://localhost:3333/api';
const TIMEOUT_REQUEST = 5000;

const getToken = () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2Q5NWZjYzA0NzQ2YTY2NzM5Yjc0NzkiLCJlbWFpbCI6IjFAbWFpbC5ydSIsImlhdCI6MTY3NTcyMDA0OSwiZXhwIjoxNjc2MzI0ODQ5fQ.sW-BsPUM7vUuIk2yH4hEI_2u68MptMouw5e-1f0DS40';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT_REQUEST,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.error(`Ошибка: ${error.message}`, 
        { 
          autoClose: AUTO_CLOSE_TOAST, 
          position: "top-center" 
        }
        );
      }

      throw error;
    }
  );

  return api;
};