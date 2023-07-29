// 'dotenv' 라이브러리를 통해 .env 파일의 환경 변수를 import
import dotenv from "dotenv";

// .env 파일의 환경 변수를 로드
dotenv.config();

// 주어진 키로 환경 변수를 가져오는 함수. 환경 변수가 없는 경우 기본값을 사용하거나,
// 기본값도 없는 경우 에러를 발생
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`${key} is undefined`);
  }
  return value;
}

// 애플리케이션 설정을 담고 있는 객체를 내보냅니다. 이 설정은 서버의 포트, 데이터베이스 접속 정보, CORS 설정 등을 포함하고 있습니다.
export const config = {
  host: {
    port: required("HOST_PORT", 3000),
  },

  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
  },

  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
};
