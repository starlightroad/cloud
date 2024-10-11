"use client";

import { Input } from "@/app/_ui/components/core/input";
import { Label } from "@/app/_ui/components/core/label";

export default function AddBookmarkForm() {
  return (
    <form id="add-bookmark-form">
      <div className="flex flex-col space-y-2">
        <Label>
          <Input type="text" name="name" placeholder="Name" />
        </Label>
        <Label>
          <Input type="text" name="url" placeholder="URL" />
        </Label>
      </div>
    </form>
  );
}
