import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { G_FAVICON_URL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFaviconFromWebsite = (domain: string, size?: number) => {
  const faviconUrl = new URL(G_FAVICON_URL);

  faviconUrl.searchParams.set("domain", domain);

  if (size) {
    faviconUrl.searchParams.set("sz", size.toString());
  }

  return faviconUrl.href;
};
