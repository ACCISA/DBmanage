import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom"
import {useAuthUser} from 'react-auth-kit'

export default function DashboardPage(){
    const {user,setUser,active} = useContext(UserContext)

    const auth = useAuthUser()

    if (!auth().data.active){
        return (<>Your account has not been activated yet {auth().data.username}</>)
    }

    return (
        <>Your Dashboard</>
    )
}