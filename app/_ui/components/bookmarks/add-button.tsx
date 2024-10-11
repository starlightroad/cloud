"use client";

import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@/app/_ui/components/core/button";

export default function AddBookmarkButton() {
  return (
    <Button size="icon" className="h-10 w-10 rounded-full" asChild>
      <Link href="/bookmarks/new" passHref>
        <PlusIcon size={20} />
      </Link>
    </Button>
  );
}
