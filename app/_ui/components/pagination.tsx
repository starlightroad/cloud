"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/app/_ui/components/core/button";
import { cn } from "@/app/_lib/utils";

type PaginationArrowProps = {
  direction: "first" | "previous" | "next" | "last";
  href: string;
  isDisabled?: boolean;
};

function PaginationArrow({ direction, href, isDisabled }: PaginationArrowProps) {
  let Arrow: JSX.Element;

  switch (direction) {
    case "first": {
      Arrow = <ChevronsLeft size={16} />;
      break;
    }
    case "previous": {
      Arrow = <ChevronLeft size={16} />;
      break;
    }
    case "next": {
      Arrow = <ChevronRight size={16} />;
      break;
    }
    case "last": {
      Arrow = <ChevronsRight size={16} />;
      break;
    }
  }

  if (isDisabled) {
    return (
      <Button size="icon" variant="outline" disabled>
        {Arrow}
      </Button>
    );
  }

  return (
    <Button size="icon" variant="outline" asChild>
      <Link href={href}>{Arrow}</Link>
    </Button>
  );
}

export function Pagination({ children }: { children: React.ReactNode }) {
  return <nav className="flex items-center justify-end space-x-3">{children}</nav>;
}

export function PaginationContent({ children }: { children: React.ReactNode }) {
  return <ul className="flex items-center gap-3">{children}</ul>;
}

export function PaginationItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <li className={cn("flex items-center justify-center", className)}>{children}</li>;
}

export function PaginationFirst({ href, isDisabled }: { href: string; isDisabled: boolean }) {
  return <PaginationArrow direction="first" href={href} isDisabled={isDisabled} />;
}

export function PaginationPrevious({ href, isDisabled }: { href: string; isDisabled: boolean }) {
  return <PaginationArrow direction="previous" href={href} isDisabled={isDisabled} />;
}

export function PaginationNext({ href, isDisabled }: { href: string; isDisabled: boolean }) {
  return <PaginationArrow direction="next" href={href} isDisabled={isDisabled} />;
}

export function PaginationLast({ href, isDisabled }: { href: string; isDisabled: boolean }) {
  return <PaginationArrow direction="last" href={href} isDisabled={isDisabled} />;
}
