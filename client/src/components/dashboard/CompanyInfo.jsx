import axios from "axios";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

export default function CompanyInfo() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get("/profile").then(({ data }) => {
      setProfile(data);
    });
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl m-4 capitalize">{profile.company}</h1>
      <div>{profile.company}</div>
      <div>Latest News</div>

      <div className="border p-4 flex flex-col justify-center items-center m-4">
      <div>Database</div>
        <div className="flex flex-row row-span-4">
        <Button className="m-4">Database 1</Button>
        <Button className="m-4">Database 2</Button>
        <Button className="m-4">Database 3</Button>
        <Button className="m-4">Database 4</Button>
        </div>
        
      </div>
    </div>
  );
}
