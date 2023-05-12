import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import UsersTable from "../components/root/UsersTable";
import { useAuthUser } from "react-auth-kit";
import AssignCompanyForm from "../components/root/AssignCompanyForm";
import AddCompanyForm from "../components/root/AddCompanyForm";
import { Tabs } from "flowbite-react";
import OwnerAssignedAlert from "../components/root/alerts/OwnerAssignedAlert";
import OwnersTable from "../components/root/alerts/OwnersTable";

export default function RootPage() {
  const { user, setRoot, setUser, root } = useContext(UserContext);
  const auth = useAuthUser();

  if (!auth().data.root) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col justify-center">
      <Tabs.Group
        className="border-2 shadow-md"
        aria-label="Tabs with icons"
        style="underline"
      >
        <Tabs.Item
          title="Users"
          // icon={HiUserCircle}
        >
          <UsersTable />
        </Tabs.Item>
        <Tabs.Item
          active={true}
          title="Add Company"
          // icon={MdDashboard}
        >
          <AddCompanyForm />
        </Tabs.Item>
        <Tabs.Item
          title="Assign Owner"
          // icon={HiAdjustments}
        >
          <AssignCompanyForm />
          <OwnersTable />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
