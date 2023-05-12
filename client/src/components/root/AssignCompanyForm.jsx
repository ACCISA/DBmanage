import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import UserNotFoundAlert from "./alerts/UserNotFoundAlert";
import OwnerAssignedAlert from "./alerts/OwnerAssignedAlert";

export default function AssignCompanyForm() {
  const [companies, setCompanies] = useState([]);
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [success, setSuccess] = useState(true);
  const options = [];

  for (let i = 0; i < companies.length; i++) {
    options.push({ value: companies[i].name, label: companies[i].name });
  }
  const handleAssignCompany = (ev) => {
    console.log("cli");
    ev.preventDefault();
    axios.post("/assign_owner", { company, username })
    .then(({data}) => {
        setSuccess(true)
    })
    .catch((err) => {
      if (err.response.status == 422) setNotFound(true);
    });
  };

  useEffect(() => {
    axios.get("/companies", {}).then(({ data }) => {
      setCompanies(data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center w-auto items-center border-4 m-8">
      <form className="flex flex-col gap-4 w-auto m-8">
        <div>
          <div className="mb-2 block">
            <Label value="Input Username" />
          </div>
          <TextInput
            type="text"
            required={true}
            value={username}
            onChange={(ev) => {
              setUsername(ev.target.value);
              setNotFound(false);
              setSuccess(false)
            }}
            className="w-40"
          />
        </div>
        <div>
          <Select onChange={(ev) => setCompany(ev.value)} options={options} />
          {/* <select onSelect={ev => console.log("csdh")} name="cars" id="cars">
                        <option>Companies</option>
                        {companies && companies.map((company) =>
                            (<option onClick={ev => console.log("csssh")} onChange={ev => console.log("ch")} onSelect={ev => console.log("ch")} value={company._id}>{company.name}</option>)
                        )}
                    </select> */}
        </div>
        {notFound && <UserNotFoundAlert />}
        {success && <OwnerAssignedAlert/>}
        <Button type="submit" className="w-40" onClick={handleAssignCompany}>
          Submit
        </Button>
      </form>
    </div>
  );
}
