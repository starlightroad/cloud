"use client";

import { Button } from "@/app/_ui/components/core/button";
import Modal, { ModalFooter, ModalHeader, ModalTitle } from "@/app/_ui/components/modal";
import AddBookmarkForm from "@/app/_ui/components/bookmarks/add-form";

export default function AddBookmarkModal() {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle>Add Bookmark</ModalTitle>
      </ModalHeader>
      <AddBookmarkForm />
      <ModalFooter>
        <Button type="submit">Create Bookmark</Button>
      </ModalFooter>
    </Modal>
  );
}
