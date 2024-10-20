import Link from "next/link";
import { redirect } from "next/navigation";
import { FolderIcon } from "lucide-react";
import { navigationRoutes } from "@/app/_lib/config";
import { getTotalBookmarks } from "@/app/_data/bookmarks";
import { getTotalCategories } from "@/app/_data/categories";

const listItems = [
  {
    label: "bookmarks",
    href: navigationRoutes.bookmarks,
    getTotalCount: getTotalBookmarks,
  },
  {
    label: "categories",
    href: navigationRoutes.categories,
    getTotalCount: getTotalCategories,
  },
];

export default function Home() {
  const isUserLoggedIn = true;

  if (!isUserLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="w-full">
      <section className="px-4">
        <h2 className="my-6 font-medium">Home</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listItems.map(async (listItem) => {
            const key = `list-item-${listItem.label}`;
            const totalCount = await listItem.getTotalCount();
            const totalCountLabel = `${totalCount} ${totalCount === 1 ? "item" : "items"}`;

            return (
              <li key={key}>
                <Link href={listItem.href} className="block h-36 rounded-2xl bg-accent p-6">
                  <FolderIcon size={20} />
                  <p className="mb-2 mt-4 capitalize">{listItem.label}</p>
                  <span className="block text-xs text-muted-foreground">{totalCountLabel}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
