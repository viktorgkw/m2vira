import { ErrorPage } from "./components/Global/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      title="Not found!"
      text="The page you were trying to access is not active!"
    />
  );
}
