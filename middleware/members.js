import Cookies from "js-cookie";

export default function({ store, redirect }) {
  const cookie = Cookies.get("access-token");
  console.log("MIDDLEWARE - ISLOGGIN? " + cookie);
  if (!cookie) {
    return redirect("/login");
  }
}
