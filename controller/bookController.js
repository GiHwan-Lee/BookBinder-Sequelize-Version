import * as bookRepository from "../data/bookModel.js";
import * as categoryRepository from "../data/categoryModel.js";

// 모든 책 목록을 가져오는 로직
export async function getAllBookList(req, res) {
  const data = await bookRepository.getAllBooks();
  res.status(200).json(data);
}

// 새로운 책 데이터를 추가하는 로직
export async function addNewBook(req, res) {
  //요청에 있는 정보를 추출
  const {
    categoryName,
    bookTitle,
    author,
    publicationYear,
    publisher,
    salesQuantity,
    productCount,
  } = req.body;

  // 카테고리 테이블에 해당 카테고리가 존재하는지를 확인 한 뒤, 없다면 새로 생성
  let category = await categoryRepository.getCategoryByName(categoryName);

  if (!category) {
    category = await categoryRepository.createCategory(categoryName);
  }

  // 북 테이블에 요청에 들어온 정보를 전달
  const newBook = await bookRepository.createBook({
    bookTitle,
    author,
    publicationYear,
    publisher,
    salesQuantity,
    productCount,
    categoryId: category.id,
  });

  res.status(201).json(newBook);
}

// 특정 카테고리에 속하는 모든 책을 가져오는 로직
export async function getAllByCategory(req, res) {
  const categoryName = req.params.categoryName;

  // getCategoryByName을 통해 카테고리 이름을 먼저 가져온다.
  const category = await categoryRepository.getCategoryByName(categoryName);

  // 그 이후 만약 DB에 해당 카테고리가 있다면 if를 통해 해당 id를 전달하여 books 테이블에서 categoryId와 조인하여 해당 책들을 가져온다.
  if (category) {
    const data = await bookRepository.getByCategory(category.id);
    res.status(200).json(data);
  } else {
    res.status(404).send("Category not found");
  }
}

// 특정 책 이름으로 해당 책의 정보를 가져오는 함수
export async function getByBookName(req, res) {
  const bookName = req.params.name;
  const data = await bookRepository.getByTitle(bookName);

  res.status(200).json(data);
}

// 특정 출판사의 모든 책을 가져오는 로직
export async function getAllByPublisher(req, res) {
  const publisherName = req.params.name;
  const data = await bookRepository.getByPublisher(publisherName);

  res.status(200).json(data);
}

// 카테고리별 총 판매량을 가져오는 로직
export async function getTotalSalesByCategory(req, res) {
  const categoryName = req.params.categoryName;
  const category = await categoryRepository.getCategoryByName(categoryName);

  if (category === null) {
    res.status(404).json({ error: "Category not found" });
    return;
  }

  const totalSales = await bookRepository.getTotalSalesByCategoryId(
    category.id
  );
  res.status(200).json({ totalSales });
}

// 카테고리별 총 재고량을 가져오는 로직
export async function getTotalStockByCategory(req, res) {
  const categoryName = req.params.categoryName;

  const category = await categoryRepository.getCategoryByName(categoryName);

  if (category === null) {
    res.status(404).json({ error: "Category not found" });
    return;
  }

  const totalStock = await bookRepository.getTotalStockByCategoryId(
    category.id
  );

  if (totalStock === null) {
    res.status(404).json({ error: "No books found for this category" });
    return;
  }

  res.status(200).json({ totalStock });
}

// 판매량 상위 3개의 책을 가져오는 로직
export async function getTopBooks(req, res) {
  const data = await bookRepository.getTopThree();

  res.status(200).json(data);
}

// 특정 책의 판매량을 업데이트 하는 로직
export async function updateSales(req, res) {
  const bookName = req.params.bookName;
  const publicationYear = req.params.publicationYear;
  const newSales = req.body.salesQuantity;

  const updated = await bookRepository.updateSalesQuantity(
    bookName,
    publicationYear,
    newSales
  );

  if (updated) {
    res.status(200).json({ success: "Sales updated successfully" });
  } else {
    res.status(500).json({ error: "Failed to update sales" });
  }
}

// 특정 책의 재고량을 업데이트 하는 로직
export async function updateStock(req, res) {
  const bookName = req.params.bookName;
  const publicationYear = req.params.publicationYear;
  const newStock = req.body.productCount;

  const updated = await bookRepository.updateProductCount(
    bookName,
    publicationYear,
    newStock
  );

  if (updated) {
    res.status(200).json({ success: "Stock updated successfully" });
  } else {
    res.status(500).json({ error: "Failed to update stock" });
  }
}

// 특정 책을 제목과 출판년도 정보를 통해 삭제하는 로직
export async function deleteBook(req, res) {
  const { bookName, publicationYear } = req.params;
  const result = await bookRepository.deleteBookByTitleAndYear(
    bookName,
    publicationYear
  );

  if (result) {
    res
      .status(200)
      .send({ success: true, message: "Book successfully deleted" });
  } else {
    res.status(404).send({ success: false, message: "Book not found" });
  }
}
