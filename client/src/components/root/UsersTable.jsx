import { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react"
import axios from "axios"
export default function UsersTable() {
  const [contacts, setContacts] = useState([]);
  const [change, setChange] = useState(false)



  const handleDeActive = ev => {
    axios.post("/deactivate", { id: ev.target.id })
    setChange(true)
  }

  const handleActive = ev => {
    axios.post("/activate", { id: ev.target.id })
    setChange(true)
  }

  useEffect(() => {
    setChange(false)
    axios.get("/users").then(({ data }) => {
      setContacts(data)
    })
  }, [change])

  return (

    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell>
            Username
          </Table.HeadCell>
          <Table.HeadCell>
            Status
          </Table.HeadCell>
          <Table.HeadCell>
            <span>
              Action
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {contacts.map((contact) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {contact.username}
              </Table.Cell>
              <Table.Cell>
                {contact.active && (<><td className="p-4 border-2">Active  </td><td><a className="bg-green-500">Active</a></td></>)}
                {!contact.active && (<><td className="p-4 border-2 text-red-500">Inactive</td><td><button className="bg-gray-500 rounded-md border-2 p-2 m-2 w-30 hover:bg-blue-600" id={contact._id} ta={"s"} onClick={handleActive}>Ativate</button></td></>)}

              </Table.Cell>


              <Table.Cell>
                <a
                  href="/tables"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>

          ))}
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>
              White
            </Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Magic Mouse 2
            </Table.Cell>
            <Table.Cell>
              Black
            </Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {/* <div className="text-black text-xl font-bold m-4">Users Database</div>
      <table className="border-black bg-gray-400 mb-8 border-separate border-spacing-2 border">
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
      </table> */}
    </div>
  );
}
