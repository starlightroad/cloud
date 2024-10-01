import { redirect } from "next/navigation";

export default function Root() {
  const isUserLoggedIn = true;

  if (!isUserLoggedIn) {
    redirect("/login");
  } else {
    redirect("/home");
  }
}
