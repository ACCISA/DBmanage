import { Alert } from "flowbite-react";

export default function UserNotFoundAlert() {
  return (
    <Alert color="failure">
      <span>
        <span className="font-medium">Error!</span> Username does not exist.
      </span>
    </Alert>
  );
}
