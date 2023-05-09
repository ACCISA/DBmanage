import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom"

export default function DashboardPage(){
    const {user,setUser,active} = useContext(UserContext)

    if (!user){
        return (<Navigate to={'/login'} />)
    }

    if (user && !active){
        return (<>Your account has not been activated yet</>)
    }

    return (
        <>Your Dashboard</>
    )
}