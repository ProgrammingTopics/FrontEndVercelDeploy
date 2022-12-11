import { HStack, VStack, Text, Container, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTeam, getTeamTasks } from "../../api";
import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";
import { taskType } from "../../types";
import TaskCard from "./taskCard";
import DelegateTaskModal from "../../components/modal/task/DelegateTaskModal";

export default function Team() {
  const [tasks, setTasks] = useState<taskType[]>([]);

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
            bgGradient="linear-gradient(to right top, #f2fef3, #dfffe3, #caffd3, #b4ffc3, #63eb85)"
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
          <Spacer></Spacer>
          <DelegateTaskModal />
          <Spacer></Spacer>
          <Container
            boxShadow="2xl"
            bgGradient="linear-gradient(to right top, #fefdf8, #fffced, #fffbe3, #fffbd8, #fcf292)"
            rounded="lg"
            p="1rem"
          >
            <Text
              bgClip="text"
              fontWeight="extrabold"
              fontSize="2xl"
              bgGradient="linear-gradient(to left, #858501, #828401, #8e9103, #a3a904, #a6ac02)"
            >
              Ongoing Tasks:
            </Text>
            <VStack>{renderUncompletedTasks()}</VStack>
          </Container>
        </HStack>
      </Sidebar>
    );
}
