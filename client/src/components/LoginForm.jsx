import axios from "axios";
import {
  Progress,
  Button,
  Label,
  TextInput,
  Checkbox,
  Alert,
} from "flowbite-react";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCred, setInvalidCred] = useState(false)
  const {user,setUser} = useContext(UserContext)
  const [redirect,setRedirect] = useState(false)
  const [redirectRoot,setRedirectRoot] = useState(false)
  const handleLogin = (ev) => {
    ev.preventDefault();
    console.log("yes");
    axios.post('/login',{
      username,
      password
    })
    .then((res) => {
      if (res.data.root){
        setRedirectRoot(true)
        setUser(username)
        return
      }
      console.log(res)
      setUser(username)
      setRedirect(true)
    })
    .catch((err) => {
      setInvalidCred(true)
    })
  };

  if (redirectRoot){
    return (<Navigate to={'root'}/>)
  }

  if (redirect){
    return (<Navigate to={'/dashboard'}/>)
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center -mt-8">
        <form className="flex flex-col gap-4 w-1/6" onSubmit={handleLogin}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Username" />
            </div>
            <TextInput
              value={username}
              onChange={(ev) => {
                setInvalidCred(false)
                setUsername(ev.target.value);
              }}
              id="email1"
              type="text"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required={true}
              value={password}
              onChange={(ev) => {
                setInvalidCred(false)
                setPassword(ev.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            {/* <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label> */}
          </div>
          {invalidCred && (<Alert color="failure">
            <span>
              <span className="font-medium">Alert!</span> Invalid Credentials.
            </span>
          </Alert>)}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </>
  );
}
