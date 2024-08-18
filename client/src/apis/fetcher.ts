import axios from "axios";
import { NEXT_PUBLIC_API_HOST } from "@constants/develop.constants";

const fetcher = axios.create({
  baseURL: NEXT_PUBLIC_API_HOST,
  timeout: 2500,
});
