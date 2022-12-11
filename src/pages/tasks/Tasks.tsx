import { Text, Container } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { taskType } from "../../types";
import UserTaskCard from "./UserTaskCard";
import { getUserTasksById } from "../../api";
import UserManager from "../../components/utils/userController";

export default function Tasks() {
  const [tasks, setTasks] = useState<taskType[]>([]);
  useEffect(() => {
    console.log(UserManager.getId());
    getUserTasksById(UserManager.getId()).then((res) => {
      setTasks(res);
    });
  }, []);
  return (
    <Sidebar>
      <Container mb="2rem">
        <Text fontSize="4xl" fontWeight="extrabold">
          Your Tasks
        </Text>
      </Container>
      {/* {tasks.map((task) => {
        return <UserTaskCard task={task} />;
      })} */}
    </Sidebar>
  );
}
