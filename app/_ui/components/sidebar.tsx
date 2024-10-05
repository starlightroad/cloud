"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
  BookmarkIcon,
  ChevronDown,
  FolderIcon,
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_ui/components/core/dropdown-menu";
import { Button } from "@/app/_ui/components/core/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_ui/components/core/avatar";
import { navigationRoutes } from "@/app/_lib/config";
import type { User } from "@/app/_lib/definitions";

const sidebarItems = [
  {
    label: "home",
    href: navigationRoutes.home,
    icon: HomeIcon,
  },
  {
    label: "bookmarks",
    href: navigationRoutes.bookmarks,
    icon: BookmarkIcon,
  },
  {
    label: "categories",
    href: navigationRoutes.categories,
    icon: FolderIcon,
  },
];

function UserDropdownMenu({ loggedInUser }: { loggedInUser: User }) {
  const avatarFallbackText = loggedInUser.name.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" className="my-3 px-3 space-x-2 justify-start h-auto">
          <Avatar className="w-6 h-6">
            <AvatarImage src="avatar.png" alt={loggedInUser.name} />
            <AvatarFallback delayMs={250}>{avatarFallbackText}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{loggedInUser.name}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <SettingsIcon size={16} className="mr-2" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full h-9">
              <LogOutIcon size={16} className="mr-2" />
              <span>Sign Out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavigationList() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col space-y-1">
      {sidebarItems.map((sidebarItem, idx) => {
        const key = `sidebar-item-${idx}`;
        const Icon = sidebarItem.icon;

        const isCurrentPage = sidebarItem.href.slice(1) === pathname.slice(1);

        const linkStyles = clsx(
          "flex items-center space-x-2 h-10 px-3 rounded-md text-primary hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
          {
            "bg-accent": isCurrentPage,
          }
        );

        return (
          <li key={key}>
            <Link href={sidebarItem.href} className={linkStyles}>
              <Icon size={16} />
              <span className="capitalize text-sm">{sidebarItem.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar() {
  const loggedInUser = {
    name: "Dylan",
    email: "dylan@cloud.com",
  };

  return (
    <div className="bg-primary-foreground max-w-56 px-4 w-full h-full">
      <UserDropdownMenu loggedInUser={loggedInUser} />
      <NavigationList />
    </div>
  );
}
