import { useState } from "react";
import {Button} from "flowbite-react"
import data from "./mock-data.json";
import axios from "axios"
export default function UsersTable() {
  const [contacts, setContacts] = useState(data);

  const handleTest = () =>{
    axios.get("/users")
  }

  return (
    <div className="app-container table-fixed bg-gray-400">
      <table>
        <thead className="bg-blue-200">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            contacts.map((contact) => (
              <tr>
                <td>{contact.fullName}</td>
                <td>{contact.address}</td>
                <td>{contact.phoneNumber}</td>
                <td>{contact.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Button onClick={handleTest}>Test API</Button>
    </div>
  );
}
