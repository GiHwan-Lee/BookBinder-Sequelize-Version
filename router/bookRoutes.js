import express from "express";
import * as bookController from "../controller/bookController.js";

const router = express.Router();

// 모든 책 상품을 가져오는 엔드포인트
// 특별하게 구분할 필요가 없기 때문에 라우터 uri는 / 로 설정했다.
router.get("/", bookController.getAllBookList);

// 책 정보를 추가하는 엔드포인트
router.post("/", bookController.addNewBook);

// 특정 카테고리에 해당하는 모든 책들을 가져오는 엔드포인트
router.get("/category/:categoryName", bookController.getAllByCategory);

// 특정 책 이름을 입력 했을 때 그 책에 대한 정보를 가져오는 엔드포인트
router.get("/bookName/:name", bookController.getByBookName);

// 특정 출판사에 해당하는 모든 책들을 가져오는 엔드포인트
router.get("/publisher/:name", bookController.getAllByPublisher);

// 카테고리별로 총 판매 수량을 가져오는 엔드포인트
router.get("/sales/:categoryName", bookController.getTotalSalesByCategory);

// 카테고리별로 총 재고 수량을 가져오는 엔드포인트
router.get("/totalStock/:categoryName", bookController.getTotalStockByCategory);

// 판매량 상위 3개 책을 가져오는 엔드포인트. 한 마디로 베스트 셀러 3가지.
router.get("/bestsellers", bookController.getTopBooks);

// 판매량을 수정하기 위한 엔드포인트
router.put(
  "/updateSales/:bookName/:publicationYear",
  bookController.updateSales
);

// 재고 수량을 수정하기 위한 엔드포인트
router.put(
  "/updateStock/:bookName/:publicationYear",
  bookController.updateStock
);

// 특정 책의 정보를 삭제하기 위한 엔드포인트
router.delete("/delete/:bookName/:publicationYear", bookController.deleteBook);

export default router;
