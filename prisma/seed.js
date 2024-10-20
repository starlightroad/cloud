const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const bcrypt = require("bcrypt");
const data = require("../app/_data/placeholder-data.js");

const seedUsers = async () => {
  try {
    const users = data.users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      return client.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
        },
      });
    });

    const insertedUsers = await Promise.all(users);

    const seededCount = insertedUsers.length;

    console.log(`Seeded ${seededCount} ${seededCount-- - 1 ? "user" : "users"}.`);
  } catch (error) {
    console.error("Failed to seed users:", error);
    throw error;
  }
};

const seedBookmarks = async () => {
  try {
    const bookmarks = data.bookmarks.map(async (bookmark) => {
      const dbUser = await getUserFromDb(bookmark.user.email);

      const category = await client.category.findUnique({
        where: {
          userId: dbUser.id,
          name: bookmark.category.label,
        },
      });

      return client.bookmark.create({
        data: {
          userId: dbUser.id,
          categoryId: category.id,
          name: bookmark.label,
          url: bookmark.href,
        },
      });
    });

    const insertedBookmarks = await Promise.all(bookmarks);

    const seededCount = insertedBookmarks.length;

    console.log(`Seeded ${seededCount} ${seededCount === 1 ? "bookmark" : "bookmarks"}.`);
  } catch (error) {
    console.error("Failed to seed bookmarks:", error);
    throw error;
  }
};

const seedCategories = async () => {
  try {
    const categories = data.categories.map(async (category) => {
      const dbUser = await getUserFromDb(category.user.email);

      return client.category.create({
        data: {
          userId: dbUser.id,
          name: category.label,
        },
      });
    });

    const insertedCategories = await Promise.all(categories);

    const seededCount = insertedCategories.length;

    console.log(`Seeded ${seededCount} ${seededCount === 1 ? "category" : "categories"}.`);
  } catch (error) {
    console.error("Failed to seed categories:", error);
    throw error;
  }
};

const getUserFromDb = async (email) => {
  const dbUser = await client.user.findUnique({
    where: {
      email,
    },
  });

  return dbUser;
};

const checkIfSeedingIsRequired = async () => {
  const numberOfUsers = await client.user.count();
  return numberOfUsers > 0 ? false : true;
};

const init = async () => {
  const isSeedingRequired = await checkIfSeedingIsRequired();

  if (isSeedingRequired) {
    await seedUsers();
    await seedCategories();
    await seedBookmarks();
  }
};

init()
  .then(async () => {
    await client.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
