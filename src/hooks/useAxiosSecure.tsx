import { config } from "@/config";
import axios from "axios";
const axiosSecure = axios.create({
  baseURL: `${config.server_url}/api`,
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
