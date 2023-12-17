import { ErrorPage } from "../components/Global/ErrorPage";

export default function Unauthenticated() {
  return (
    <ErrorPage
      title="Unauthenticated!"
      text="You should sign in your profile!"
    />
  );
}
