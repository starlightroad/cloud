const { navigationRoutes } = require("../_lib/config");

const users = [];

const bookmarks = [
  {
    label: "Square Enix",
    href: "https://square-enix-games.com/en_US",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
  },
  {
    label: "NerdWallet",
    href: "https://www.nerdwallet.com",
  },
  {
    label: "TechCrunch",
    href: "https://techcrunch.com",
  },
  {
    label: "Mayo Clinic",
    href: "https://www.mayoclinic.org",
  },
];

const categories = [
  {
    label: "health",
    href: `${navigationRoutes.bookmarks}/health`,
  },
  {
    label: "tech",
    href: `${navigationRoutes.bookmarks}/tech`,
  },
  {
    label: "finance",
    href: `${navigationRoutes.bookmarks}/finance`,
  },
  {
    label: "entertainment",
    href: `${navigationRoutes.bookmarks}/entertainment`,
  },
  {
    label: "gaming",
    href: `${navigationRoutes.bookmarks}/gaming`,
  },
];

module.exports = {
  users,
  bookmarks,
  categories,
};
