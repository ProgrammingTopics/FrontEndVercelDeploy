import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";

export default function Reports() {
  if (UserManager.getUserType() !== "RH") {
    return (
      <Sidebar>Permission Denied, your role is not Humans Resources</Sidebar>
    );
  } else return <Sidebar>Reports</Sidebar>;
}
