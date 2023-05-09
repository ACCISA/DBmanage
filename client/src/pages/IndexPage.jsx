import { UserContext } from "../UserContext"
import { useContext } from "react"
import LoginRegister from "../components/index/LoginRegister"
export default function IndexPage(){
    const {user, setUser} = useContext(UserContext)
    return (
        <> {user && <div>LoggedIn</div>}{!user && <div>NotLoggedIn</div>}
            <LoginRegister></LoginRegister>
        </>
    )
}