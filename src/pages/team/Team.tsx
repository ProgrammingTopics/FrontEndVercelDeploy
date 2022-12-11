import { HStack, VStack, Text, Container, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTeamTasks } from "../../api";
import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";
import { taskType } from "../../types";
import TaskCard from "./TaskCard";
import DelegateTaskModal from "../../components/modal/task/DelegateTaskModal";

export default function Team() {
  const [tasks, setTasks] = useState<taskType[]>([
    {
      status: false,
      name: "Form",
      assign: "Igor",
      gitRepo: "https://github.com/minix3/minix",
      description: "fazer form para desenvolvimento de custeio",
      taskStatus: "Completed",
    },
  ]);

  useEffect(() => {
    getManagerData();
  }, []);

  const getManagerData = async () => {
    setTasks(await getTeamTasks(UserManager.getTeam()));
  };

  const renderCompletedTasks = () =>
    tasks.map((task) => {
      if (task.taskStatus === "Completed") return <TaskCard task={task} />;
      else return <></>;
    });
  const renderUncompletedTasks = () =>
    tasks.map((task) => {
      if (task.taskStatus === "onGoing") return <TaskCard task={task} />;
      else return <></>;
    });

  if (UserManager.getUserType() !== "Manager")
    return <Sidebar> Permission Denied, your role is not Team Manager</Sidebar>;
  else
    return (
      <Sidebar>
        <HStack>
          <Container
            boxShadow="2xl"
            bgGradient="linear-gradient(to left, #55a0f4, #20b0f9, #00bff8, #00ccf2, #00d8e9)"
            rounded="lg"
            p="1rem"
          >
            <Text
              bgClip="text"
              fontWeight="extrabold"
              fontSize="2xl"
              bgGradient="linear-gradient(to right top, #444342, #3a3939, #302f2f, #262626, #1d1d1d)"
            >
              Ongoing Tasks:
            </Text>
            <VStack>{renderUncompletedTasks()}</VStack>
          </Container>
          <Spacer></Spacer>
          <DelegateTaskModal />
          <Spacer></Spacer>
          <Container
            bgGradient="linear-gradient(to right, #55a0f4, #20b0f9, #00bff8, #00ccf2, #00d8e9)"
            boxShadow="2xl"
            rounded="lg"
            p="1rem"
          >
            <Text
              bgGradient="linear-gradient(to right top, #444342, #3a3939, #302f2f, #262626, #1d1d1d)"
              fontSize="2xl"
              bgClip="text"
              fontWeight="extrabold"
            >
              Completed Tasks:
            </Text>
            <VStack>{renderCompletedTasks()}</VStack>
          </Container>
        </HStack>
      </Sidebar>
    );
}
