import Link from "next/link";
import Image from "next/image";
import { EllipsisVerticalIcon, ExternalLinkIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { getFaviconFromWebsite } from "@/app/_lib/utils";
import type { Bookmark } from "@/app/_lib/definitions";
import { getFilteredBookmarks } from "@/app/_data/bookmarks";
import Search from "@/app/_ui/components/search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_ui/components/core/dropdown-menu";
import AddBookmarkButton from "@/app/_ui/components/bookmarks/add-button";
import { TablePagination } from "@/app/_ui/components/bookmarks/pagination";
import { ITEMS_PER_PAGE } from "@/app/_lib/constants";

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
            <Link href={bookmark.url} target="_blank">
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

export default async function Bookmarks({ searchParams }: { searchParams?: { query?: string } }) {
  const searchQuery = searchParams?.query || "";
  const filteredBookmarks = await getFilteredBookmarks(searchQuery);

  const totalBookmarks = filteredBookmarks.length;

  const hasBookmarks = !!filteredBookmarks.length;

  const pageCount = Math.ceil(totalBookmarks / ITEMS_PER_PAGE);

  return (
    <main className="w-full py-4">
      <section className="px-4">
        <header className="mb-6 flex space-x-2">
          <h2 className="font-medium">Bookmarks</h2>
          <p className="text-muted-foreground">{totalBookmarks}</p>
        </header>
        <div className="flex justify-between space-x-3">
          <div className="w-full md:max-w-80">
            <Search placeholder="Search" />
          </div>
          <AddBookmarkButton />
        </div>

        {!hasBookmarks && <p className="my-6 text-muted-foreground">No bookmarks were found.</p>}

        {hasBookmarks && (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBookmarks.map((bookmarkItem) => {
              const key = `bookmark-${bookmarkItem.name}`;
              const faviconUrl = getFaviconFromWebsite(bookmarkItem.url, 64);

              return (
                <li key={key} className="relative">
                  <BookmarkMenu bookmark={bookmarkItem} />
                  <Link
                    href={bookmarkItem.url}
                    target="_blank"
                    className="block h-36 rounded-2xl bg-accent p-6"
                  >
                    <div className="flex items-center justify-between">
                      <Image
                        src={faviconUrl}
                        alt={`The brand logo for ${bookmarkItem.name}`}
                        width={20}
                        height={20}
                      />
                      <EllipsisVerticalIcon size={20} className="hidden" />
                    </div>
                    <p className="mt-4 font-medium">{bookmarkItem.name}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {hasBookmarks && <TablePagination pageCount={pageCount} />}
      </section>
    </main>
  );
}
