import { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import axios from "axios";
import ConfirmCompanyDelete from "./alerts/ConfirmCompanyDelete";
export default function CompaniesTable() {
  const [contacts, setContacts] = useState([]);
  const [change, setChange] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [companyId, setCompanyId] = useState('')

  

  useEffect(() => {
    setChange(false);
    axios.get("/companies").then(({ data }) => {
      setContacts(data);
    });
  }, [change]);

  return (
    <div>
        {showAlert && (
            <ConfirmCompanyDelete setShowAlert={setShowAlert} setChange={setChange} showAlert={showAlert} companyId={companyId}/>
        )}
<Table className="mt-4">
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Owned</Table.HeadCell>
        <Table.HeadCell>
          <span>Action</span>
        </Table.HeadCell>
        <Button onClick={(ev) => setChange(true)} className="w-8">
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
              {contact.name}
            </Table.Cell>
            <Table.Cell>
              {contact.owner && <a>True</a>}
              {!contact.owner && <a>False</a>}
            </Table.Cell>

            <Table.Cell>
              <a
                id={contact._id}
                onClick={
                    ev => {
                        setShowAlert(true)
                        setCompanyId(contact._id)
                    }
                }
                className="ml-4 cursor-pointer font-medium text-red-600 hover:underline dark:text-blue-500"
              >
                Delete
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    </div>
    
  );
}
