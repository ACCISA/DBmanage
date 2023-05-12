import { Alert } from "flowbite-react";

export default function UserNotFoundAlert() {
  return (
    <Alert color="failure">
      <span>
        <span className="font-medium">Error!</span> This user is already an owner.
      </span>
    </Alert>
  );
}
