import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_ui/components/core/dialog";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-full sm:max-w-96">{children}</DialogContent>
    </Dialog>
  );
}

export { DialogHeader as ModalHeader, DialogTitle as ModalTitle, DialogFooter as ModalFooter };
