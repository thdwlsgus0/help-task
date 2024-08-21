import axios from "axios";
import { NEXT_PUBLIC_API_HOST } from "@constants/develop.constants";

const fetcher = axios.create({
  baseURL: NEXT_PUBLIC_API_HOST,
  timeout: 2500,
});

// api 요청을 낚아챔
fetcher.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  // 로그인, 회원가입 단계 api에서는 accessToken이 없으니 바로 return
  if (!accessToken) return config;

  // 그 외의 api 에서는 accessToken을 사용해 사용자 인증
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

let refreshing = false; // 현재 리프레시중인지 여부

// api 응답을 낚아챔
fetcher.interceptors.response.use(
  // 1. 응답에 성공한 경우
  (config) => {
    return config;
  },
  // 2. 응답에 실패한 경우
  async (error) => {
    if (!refreshing) {
      // 액세스토큰 만료 시
      refreshing = true;
      // 토큰 재발급 (아직 미작성)
      refreshing = false;
    }
    // 리프레시 중인 경우 토큰 재발급을 하지 않고 다시 시도
    return fetcher.request(error.config);
  },
);

export default fetcher;
