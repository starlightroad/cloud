import Link from "next/link";
import Image from "next/image";
import { EllipsisVerticalIcon, ExternalLinkIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { getFaviconFromWebsite } from "@/app/_lib/utils";
import type { Bookmark } from "@/app/_lib/definitions";
import { getFilteredBookmarks, getTotalBookmarks } from "@/app/_data/bookmarks";
import Search from "@/app/_ui/components/search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_ui/components/core/dropdown-menu";

function BookmarkMenu({ bookmark }: { bookmark: Bookmark }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="absolute right-5 top-5 cursor-context-menu rounded-sm px-0.5 py-1 text-accent-foreground hover:bg-zinc-300">
          <EllipsisVerticalIcon size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={bookmark.href} target="_blank">
              <ExternalLinkIcon size={16} className="mr-2" />
              <span>View</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PencilIcon size={16} className="mr-2" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2Icon size={16} className="mr-2" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Bookmarks({ searchParams }: { searchParams?: { query?: string } }) {
  const totalBookmarks = getTotalBookmarks();

  const searchQuery = searchParams?.query || "";
  const filteredBookmarks = getFilteredBookmarks(searchQuery);

  return (
    <main className="w-full py-4">
      <section className="px-4">
        <header className="mb-6 flex space-x-2">
          <h2 className="font-medium">Bookmarks</h2>
          <p className="text-muted-foreground">{totalBookmarks}</p>
        </header>
        <div className="md:max-w-80">
          <Search placeholder="Search" />
        </div>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map((bookmarkItem) => {
            const key = `bookmark-${bookmarkItem.label}`;
            const faviconUrl = getFaviconFromWebsite(bookmarkItem.href, 64);

            return (
              <li key={key} className="relative">
                <BookmarkMenu bookmark={bookmarkItem} />
                <Link
                  href={bookmarkItem.href}
                  target="_blank"
                  className="block h-36 rounded-2xl bg-accent p-6"
                >
                  <div className="flex items-center justify-between">
                    <Image
                      src={faviconUrl}
                      alt={`The brand logo for ${bookmarkItem.label}`}
                      width={20}
                      height={20}
                    />
                    <EllipsisVerticalIcon size={20} className="hidden" />
                  </div>
                  <p className="mt-4 font-medium">{bookmarkItem.label}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
