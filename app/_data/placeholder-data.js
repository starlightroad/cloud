const users = [
  {
    name: "Demo Account",
    email: "demoaccount@cloud.com",
    password: "d3m0@cc0unt1234!",
  },
];

const categories = [
  {
    label: "health",
    user: users[0],
  },
  {
    label: "tech",
    user: users[0],
  },
  {
    label: "finance",
    user: users[0],
  },
  {
    label: "entertainment",
    user: users[0],
  },
  {
    label: "gaming",
    user: users[0],
  },
];

const bookmarks = [
  {
    label: "Square Enix",
    href: "https://square-enix-games.com/en_US",
    user: users[0],
    category: categories[4],
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    user: users[0],
    category: categories[3],
  },
  {
    label: "NerdWallet",
    href: "https://www.nerdwallet.com",
    user: users[0],
    category: categories[2],
  },
  {
    label: "TechCrunch",
    href: "https://techcrunch.com",
    user: users[0],
    category: categories[1],
  },
  {
    label: "Mayo Clinic",
    href: "https://www.mayoclinic.org",
    user: users[0],
    category: categories[0],
  },
];

module.exports = {
  users,
  bookmarks,
  categories,
};
