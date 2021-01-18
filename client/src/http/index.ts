import axios, { AxiosInstance } from "axios";

export class OtherHttp {
  instance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001'
  })
}