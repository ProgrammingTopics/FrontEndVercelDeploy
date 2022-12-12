import {
  HStack,
  VStack,
  Text,
  Container,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTeamTasks } from "../../api";
import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";
import { taskType } from "../../types";
import DelegateTaskModal from "../../components/modal/task/DelegateTaskModal";
import TeamTaskCard from "./TeamTaskCard";

export default function Team() {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");

  useEffect(() => {
    getManagerData();
  }, []);

  const getManagerData = async () => {
    setTasks(await getTeamTasks(UserManager.getTeam()));
  };

  const renderCompletedTasks = () =>
    tasks.length > 0 ? (
      tasks.map((task) => {
        if (task.status === "Completed") return <TeamTaskCard task={task} />;
        else return <></>;
      })
    ) : (
      <></>
    );
  const renderUncompletedTasks = () =>
    tasks.length > 0 ? (
      tasks.map((task) => {
        if (task.status === "onGoing") return <TeamTaskCard task={task} />;
        else return <></>;
      })
    ) : (
      <></>
    );

  if (UserManager.getUserType() !== "Manager")
    return <Sidebar> Permission Denied, your role is not Team Manager</Sidebar>;
  else
    return (
      <Sidebar>
        {isLargerThan450 ? (
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
        ) : (
          <VStack>
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
            <DelegateTaskModal isMobile={true} />
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
          </VStack>
        )}
      </Sidebar>
    );
}
