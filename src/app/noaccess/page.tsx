import { ErrorPage } from "../components/Global/ErrorPage";

export default function NoAccess() {
  return (
    <ErrorPage title="No access!" text="You have no access to this resource!" />
  );
}
