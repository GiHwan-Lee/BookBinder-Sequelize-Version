import express from "express";
import "express-async-errors"; // 비동기 오류 처리 미들웨어
import helmet from "helmet"; // 보완 향상을 위한 라이브러리
import morgan from "morgan"; // 요청 로깅 라이브러리
import cors from "cors"; // CORS 미들웨어
import { config } from "./config.js"; // 환경변수 설정 파일
import { initializeDatabase } from "./db/database.js"; // 데이터베이스 연결 파일
import bookRouter from "./router/bookRoutes.js"; // 상품 관련 라우터

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin, // CORS 허용 origin 설정
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/books", bookRouter); // 상품 관련 라우팅

// 없는 경로에 대한 오류 처리 미들웨어
app.use((req, res) => {
  res.sendStatus(404);
});

// 오류 처리 미들웨어
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// 데이터베이스 연결 및 서버 실행
initializeDatabase()
  .then(() => {
    console.log("DB Connected...");

    app.listen(config.host.port, () => {
      console.log(`Server is started... ${new Date()}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// process.exit(1);은 에러가 났을 때 프로세스를 종료하도록 하는 코드
