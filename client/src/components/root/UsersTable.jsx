import { useState, useEffect } from "react";
import { Button, Table, Alert } from "flowbite-react";
import React from "react";
import axios from "axios";
import ConfirmUserDelete from "./alerts/ConfirmUserDelete";
export default function UsersTable() {
  const [contacts, setContacts] = useState([]);
  const [change, setChange] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userId, setUserId] = useState("");

  const handleDeActive = (ev) => {
    setChange(true);

    axios.post("/deactivate", { id: ev.target.id }).then(({ data }) => {
      if (data == "ok") {
        console.log(contacts);
      }
    });
  };

  const handleActive = (ev) => {
    setChange(true);
    axios.post("/activate", { id: ev.target.id });
  };

  useEffect(() => {
    setRefresh(false);
    setChange(false);
    axios.get("/users").then(({ data }) => {
      setContacts(data);
    });
  }, [change, refresh]);

  return (
    <div>
      {showAlert && (
        <ConfirmUserDelete setShowAlert={setShowAlert} setChange={setChange} showAlert={showAlert} userId={userId}/>
      )}
      <Table>
        <Table.Head>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span>Action</span>
          </Table.HeadCell>
          <Button onClick={(ev) => setRefresh(true)} className="w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </Button>
        </Table.Head>
        <Table.Body className="divide-y">
          {contacts.map((contact) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {contact.username}
              </Table.Cell>
              <Table.Cell>
                {contact.active && <a className="text-green-500">Active</a>}
                {!contact.active && <a className="text-red-500">Inactive</a>}
              </Table.Cell>

              <Table.Cell>
                {contact.active && (
                  <a
                    id={contact._id}
                    onClick={handleDeActive}
                    className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Deactivate
                  </a>
                )}
                {!contact.active && (
                  <a
                    id={contact._id}
                    onClick={handleActive}
                    className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Activate
                  </a>
                )}
                <a
                  id={contact._id}
                  onClick={(ev) => {setShowAlert(true); setUserId(ev.target.id)}}
                  className="ml-4 cursor-pointer font-medium text-red-600 hover:underline dark:text-blue-500"
                >
                  Delete
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
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
