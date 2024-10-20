import prisma from "@/prisma/client";

export const getTotalBookmarks = async () => {
  try {
    const bookmarksCount = await prisma.bookmark.count();
    return bookmarksCount;
  } catch (error) {
    throw new Error("Failed to Get Total Bookmarks.");
  }
};

export const getFilteredBookmarks = async (query: string) => {
  try {
    const filteredBookmarks = await prisma.bookmark.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return filteredBookmarks;
  } catch (error) {
    throw new Error("Failed to Get Filtered Bookmarks.");
  }
};
