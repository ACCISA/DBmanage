import {
    Button,
    Label,
    TextInput,
    Alert
} from "flowbite-react";
import { useEffect, useState } from "react"
import axios from "axios"
export default function AddCompanyForm() {

    const [companyName, setCompanyName] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [dupe, setDupe] = useState(false)

    const handleAddCompany = ev => {
        ev.preventDefault()
        axios.post("/add_company", { companyName })
            .then(({ data }) => {
                setConfirm(true)
            })
            .catch((err) => {
                console.log(err.response.status)
                if (err.response.status != 422) return;
                setDupe(true)

            })
    }
    return (
        <div>
            <form className="flex flex-col gap-4 w-auto">
                <div>
                    <div className="mb-2 block">
                        <Label value="Company Name" />
                    </div>
                    <TextInput
                        type="text"
                        required={true}
                        className="w-40"
                        value={companyName}
                        onChange={ev => { setCompanyName(ev.target.value); setDupe(false); setConfirm(false) }}
                    />
                </div>
                {dupe && (<Alert color="failure" className="w-40">
                    <span>
                        <span className="font-medium">Alert!</span> Company Name already in use.
                    </span>
                </Alert>)}
                {confirm && (<Alert color="green" className="w-40">
                    <span>
                        <span className="font-medium">Alert!</span> Company added.
                    </span>
                </Alert>)}
                <Button type="submit" className="w-40" onClick={handleAddCompany}>
                    Submit
                </Button>
            </form>
        </div>
    )
}