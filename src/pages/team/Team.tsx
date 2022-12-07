import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";

export default function Team() {
  if (UserManager.getUserType() !== "Manager")
    return <Sidebar> Permission Denied, your role is not Team Manager</Sidebar>;
  else return <Sidebar>Team</Sidebar>;
}
