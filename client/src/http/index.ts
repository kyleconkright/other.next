import axios, { AxiosInstance } from "axios";

export class OtherHttp {
  instance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL
  })
}