export function showBookDetail(vue, book) {
  vue.$router.push({
    path: "/store/detail",
    query: {
      fileName: book.fileName,
      // category: book.categoryText,
    },
  });
}
