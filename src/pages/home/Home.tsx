import PointRegisterCard from "../../components/PointRegisterCard";
import Sidebar from "../../components/Sidebar";
import { Text } from "@chakra-ui/react";
import UserManager from "../../components/utils/userController";
export default function Home() {
  if (UserManager.getUserType())
    return (
      <Sidebar>
        <PointRegisterCard></PointRegisterCard>
      </Sidebar>
    );
  else
    return (
      <Text fontWeight="extrabold" fontSize={50}>
        Access Denied, you need to log in normally asshole!
      </Text>
    );
}
