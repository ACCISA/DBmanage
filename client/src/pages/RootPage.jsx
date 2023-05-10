import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import UsersTable from "../components/root/UsersTable";
import {useAuthUser} from 'react-auth-kit'

export default function RootPage() {
  const { user, setRoot, setUser, root } = useContext(UserContext);   
  const auth = useAuthUser() 

  if (!auth().data.root){
    return(<Navigate to={'/'}/>)
  }

  return (<div className="flex flex-col justify-center">
    <UsersTable/>
  </div>)

}
