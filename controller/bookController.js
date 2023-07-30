import * as bookRepository from "../data/bookModel.js";
import * as categoryRepository from "../data/categoryModel.js";

export async function getAllBookList(req, res) {
  const data = await bookRepository.getAllBooks();
  res.status(200).json(data);
}

export async function addNewBook(req, res) {
  const {
    categoryName,
    bookTitle,
    author,
    publicationYear,
    publisher,
    salesQuantity,
    productCount,
  } = req.body;

  let category = await categoryRepository.getCategoryByName(categoryName);

  if (!category) {
    category = await categoryRepository.createCategory(categoryName);
  }

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

// getCategoryByName을 통해 카테고리 이름을 먼저 가져와야 한다.
// 그 이후 만약 DB에 해당 카테고리가 있다면 if를 통해 해당 id를 전달하여 books 테이블에서 categoryId와 조인하여 해당 책들을 가져온다.
export async function getAllByCategory(req, res) {
  const categoryName = req.params.categoryName;
  const category = await categoryRepository.getCategoryByName(categoryName);

  if (category) {
    const data = await bookRepository.getByCategory(category.id);
    res.status(200).json(data);
  } else {
    res.status(404).send("Category not found");
  }
}

export async function getByBookName(req, res) {
  const bookName = req.params.name;
  const data = await bookRepository.getByTitle(bookName);

  res.status(200).json(data);
}

export async function getAllByPublisher(req, res) {
  const publisherName = req.params.name;
  const data = await bookRepository.getByPublisher(publisherName);

  res.status(200).json(data);
}

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

export async function getTopBooks(req, res) {
  const data = await bookRepository.getTopThree();

  res.status(200).json(data);
}

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
