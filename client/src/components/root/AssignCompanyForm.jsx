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
        axios.get("/companies", {})
            .then(({ data }) => {
                setCompanies(data)
            })
    }, [])

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
                        className="w-40"
                    />
                </div>
                <div>
                    <select name="cars" id="cars">
                        <option>Companies</option>
                        {companies && companies.map((company) =>
                            (<option onClick={console.log("ㅁㄴㅇ")} value={company.name}>{company.name}</option>)
                        )}
                    </select>
                </div>

                <Button type="submit" className="w-40" onClick={handleAssignCompany}>
                    Submit
                </Button>
            </form>

        </div>
    )

}