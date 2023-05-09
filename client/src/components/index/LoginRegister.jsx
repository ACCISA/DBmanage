import {Button} from "flowbite-react"
import { Link } from "react-router-dom"
export default function LoginRegister() {
    return (

        <>
            <div className="flex flex-row gap-8 justify-center">
                <div>
                    <Link to={"/login"}>
                    <Button>Login</Button>
                    </Link>
                </div>
                <div><Link to={"/register"}>
                    <Button>Register</Button>
                    </Link></div>
            </div>
        </>

    )
}