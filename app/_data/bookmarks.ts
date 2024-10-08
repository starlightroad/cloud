import { bookmarks } from "@/app/_data/placeholder-data";

export const getTotalBookmarks = () => {
  return bookmarks.length;
};

export const getFilteredBookmarks = (query: string) => {
  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.label.toLowerCase().includes(query.toLowerCase()),
  );

  return filteredBookmarks;
};
