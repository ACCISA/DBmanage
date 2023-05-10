import { useState,useEffect } from "react";
import {Button} from "flowbite-react"
import data from "./mock-data.json";
import axios from "axios"
export default function UsersTable() {
  const [contacts, setContacts] = useState(data);
  const [change, setChange] = useState(false)

  const handleTest = () =>{
    axios.get("/users")
  }


  const handleDeActive = ev => {

  }

  const handleActive = ev => {
    console.log(ev.target.id)
    axios.post("/activate", {id:ev.target.id})
    setChange(true)
  }

  useEffect(() => {
    setChange(false)
    axios.get("/users").then(({data}) =>{
      setContacts(data)
    })
  }, [change])

  return (
    
    <div className="app-container table-fixed bg-gray-400">
      <table>
        <thead className="bg-blue-200">
          <tr>
            <th>Users</th>
            <th>Status</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {contacts &&
            contacts.map((contact) => (
              <tr>
                <td>{contact.username}</td>
                {contact.active && (<><td>Active</td><td><Button onClick={handleDeActive}>Deactivate</Button></td></>)}
                {!contact.active && (<><td>Inactive</td><td><button className="bg-gray-500 rounded-md p-2 m-2" id={contact._id} ta={"s"} onClick={handleActive}>Ativate</button></td></>)}
                
              </tr>
            ))}
        </tbody>
      </table>
      <Button onClick={handleTest}>Test API</Button>
    </div>
  );
}
