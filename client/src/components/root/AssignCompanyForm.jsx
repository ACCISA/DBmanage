import {
    Button,
    Label,
    TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react"
import axios from "axios"

export default function AssignCompanyForm() {

    const [companies, setCompanies] = useState([])

    const handleAssignCompany = ev => {
        ev.preventDefault()
    }

    useEffect(() => {
        console.log("te")
        axios.get("/companies", {})
            .then(({ data }) => {
                console.log(data)
                setCompanies(data)
                console.log("tewwasds")
            })
    }, [])

    return (
        <div className="flex flex-col justify-center w-auto">
            <form className="flex flex-col gap-4 w-auto">
                <div>
                    <div className="mb-2 block">
                        <Label value="Input Username" />
                    </div>
                    <TextInput
                        type="text"
                        required={true}
                        className="w-40"
                    />
                </div>
                <div>
                    <select name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                        {companies && companies.map((company) => {
                            console.log(company)
                        })}
                    </select>

                    {/* <Dropdown onClick={ev => { ev.preventDefault() }}
                        label={company}
                        inline={false}
                    >
                        <Dropdown.Item onClick={ev => { console.log(ev) }} >
                            Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Settings
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Earnings
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown> */}
                </div>

                <Button type="submit" className="w-40" onClick={handleAssignCompany}>
                    Submit
                </Button>
            </form>

        </div>
    )

}