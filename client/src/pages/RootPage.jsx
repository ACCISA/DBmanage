import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom"
export default function RootPage(){

    const {root} = useContext(UserContext)


    if (!root){
        return (<Navigate to={'/'}/>)
    }

    return (<>
        RootPage
    </>)
}