import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";

export default function Employers() {
  if (UserManager.getUserType() !== "RH") {
    return (
      <Sidebar>Permission Denied, your role is not Human Resources</Sidebar>
    );
  } else return <Sidebar>Employers</Sidebar>;
}
