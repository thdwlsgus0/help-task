import axios from "axios";
import { NEXT_PUBLIC_API_HOST } from "@constants/develop.constants";

const fetchers = axios.create({
  baseURL: NEXT_PUBLIC_API_HOST,
  timeout: 2500,
});
