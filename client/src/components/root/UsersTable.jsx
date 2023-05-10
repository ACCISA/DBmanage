import { useState,useEffect } from "react";
import {Button} from "flowbite-react"
import data from "./mock-data.json";
import axios from "axios"
export default function UsersTable() {
  const [contacts, setContacts] = useState(data);
  const [change, setChange] = useState(false)



  const handleDeActive = ev => {  
    axios.post("/deactivate", {id:ev.target.id})
    setChange(true)
  }

  const handleActive = ev => {
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
    
    <div className="table-auto text-white flex justify-center items-center flex-col m-10 border-4">
      <div className="text-black text-xl font-bold m-4">Users Database</div>
      <table className="border-black bg-gray-400 border-separate border-spacing-2 border">
        <thead className="bg-gray-500">
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
                <td className="p-4 border-2">{contact.username}</td>
                {contact.active && (<><td className="p-4 border-2">Active  </td><td><button className="bg-gray-500 rounded-md border-2 p-2 m-2 w-30 hover:bg-blue-600" id={contact._id} onClick={handleDeActive}>Deactivate</button></td></>)}
                {!contact.active && (<><td className="p-4 border-2 text-red-500">Inactive</td><td><button className="bg-gray-500 rounded-md border-2 p-2 m-2 w-30 hover:bg-blue-600" id={contact._id} ta={"s"} onClick={handleActive}>Ativate</button></td></>)}
                
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
