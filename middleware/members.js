export default function({ store, redirect }) {
  if (store.state.authUser == null) {
    console.warn("Not authorized!");
    return redirect("/login");
  }
}
