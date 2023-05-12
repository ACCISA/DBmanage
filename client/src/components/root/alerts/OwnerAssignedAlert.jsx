import {Alert} from "flowbite-react"

export default function OwnerAssignedAlert(){
    return (
        <Alert color="green">
        <span>
          <span className="font-medium">Success!</span> Owner has been assigned.
        </span>
      </Alert>
    )
}