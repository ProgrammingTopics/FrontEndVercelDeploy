import {
  Heading,
  HStack,
  VStack,
  Text,
  Container,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTeam, getTeamTasks } from "../../api";
import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";
import { taskType } from "../../types";
import TaskCard from "./taskCard";
import { useMediaQuery } from "@chakra-ui/react";
import { AiOutlineUserAdd } from "react-icons/ai";
import DelegateTaskModal from "../../components/modal/task/DelegateTaskModal";

export default function Team() {
  const [isLargerThan1800] = useMediaQuery("(min-width: 1800px)");
  const [team, setTeam] = useState([]);
  const [tasks, setTasks] = useState<taskType[]>([
    {
      name: "name",
      assign: ["Igor", "Marcelo"],
      gitRepo: "gitrepo",
      description: "fazer logo",
      status: "Completed",
    },
    {
      name: "name2",
      assign: ["marcelo"],
      gitRepo: "gitrepo",
      description: "fazer capa",
      status: "onGoing",
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
      if (task.status === "Completed") return <TaskCard task={task} />;
      else return <></>;
    });
  const renderUncompletedTasks = () =>
    tasks.map((task) => {
      if (task.status === "onGoing") return <TaskCard task={task} />;
      else return <></>;
    });

  if (UserManager.getUserType() !== "Manager")
    return <Sidebar> Permission Denied, your role is not Team Manager</Sidebar>;
  else
    return (
      <Sidebar>
        <HStack>
          <Container
            bgGradient="linear-gradient(to left, #32d80e, #28d741, #27d65e, #30d475, #3fd188)"
            boxShadow="2xl"
            rounded="lg"
            p="1rem"
          >
            <Text
              bgGradient="linear-gradient(to right, #178102, #06761c, #0e7735, #1a7441, #2f855a);"
              fontSize="2xl"
              bgClip="text"
              fontWeight="extrabold"
            >
              Completed Tasks
            </Text>
            <VStack>{renderCompletedTasks()}</VStack>
          </Container>
          <Spacer></Spacer>
          <DelegateTaskModal />
          <Spacer></Spacer>
          <Container
            boxShadow="2xl"
            bgGradient="linear-gradient(to left, #cdcd06, #d5d704, #dde103, #e4ec01, #ecf600)"
            rounded="lg"
            p="1rem"
          >
            <Text
              bgClip="text"
              fontWeight="extrabold"
              fontSize="2xl"
              bgGradient="linear-gradient(to left, #858501, #828401, #8e9103, #a3a904, #a6ac02)"
            >
              On Going Tasks
            </Text>
            <VStack>{renderUncompletedTasks()}</VStack>
          </Container>
        </HStack>
      </Sidebar>
    );
}
