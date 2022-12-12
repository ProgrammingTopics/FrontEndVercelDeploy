import {
  Box,
  Center,
  useColorModeValue,
  Text,
  Stack,
  Avatar,
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { endWork, startWork } from "../api";
import { routineEnded, routineStarted, ticketError } from "../sweetalert2";
import { todayDate, todayWeekDay } from "./utils/dateController";
import UserManager from "./utils/userController";

export default function PointRegisterCard() {
  const [clockState, setClockState] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);

  const onClickStartWork = () => {
    var currentDateTime = new Date();
    var resultInSeconds = currentDateTime.getTime() / 1000;
    startWork(UserManager.getId(), resultInSeconds).then(
      (res: { status: boolean }) => {
        if (res.status) {
          setEndTime("");
          UserManager.setTime(resultInSeconds);
          routineStarted();
        } else ticketError();
      }
    );
  };

  function secondsToHms(d: number) {
    var h = Math.floor(d / 3600 - 3) % 24;
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor(d % 60);
    return h + ":" + m + ":" + s;
  }

  const onClickEndRoutine = () => {
    var currentDateTime = new Date();
    var resultInSeconds = currentDateTime.getTime() / 1000;
    setEndTime(clockState);
    endWork(UserManager.getId(), resultInSeconds).then(
      (res: { status: boolean }) => {
        if (res.status) {
          UserManager.setTime(0);
          routineEnded();
        } else ticketError();
      }
    );
  };

  return (
    <Center py={12}>
      <Box
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Flex rounded={"lg"} pos={"relative"} height={"180px"}>
          <Avatar size="2xl" name={UserManager.getFullName()} />
          <Flex direction={"column"}>
            <Text> {UserManager.getFullName()} </Text>
            <Text color={"gray.500"} ms={"1em"}>
              {UserManager.getRole()}
            </Text>
            <Text color={"gray.500"} ms={"1.5em"}>
              {UserManager.getTeam()}
            </Text>
            <Text color={"gray.500"} ms={"1em"}>
              {todayDate()}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Flex direction={"column"}>
            <Text>Entry time:</Text>
            <Text>
              {UserManager.getTime() === 0
                ? "No entry yet"
                : secondsToHms(UserManager.getTime())}
            </Text>
          </Flex>
          <Spacer></Spacer>
          <Flex direction={"column"}>
            <Text>Exit time:</Text>
            <Text>{endTime}</Text>
          </Flex>
        </Flex>
        <Stack pt={10} align={"center"}>
          <Flex>
            <Button
              onClick={() => {
                onClickStartWork();
              }}
              disabled={UserManager.getTime() > 0}
            >
              Entry
            </Button>
            <Button
              disabled={UserManager.getTime() === 0 || endTime !== ""}
              ms="1em"
              onClick={() => {
                onClickEndRoutine();
              }}
            >
              Exit
            </Button>
          </Flex>
          <Text color={"gray.500"} fontSize={"md"}>
            {clockState}
          </Text>
          <Text color={"gray.500"} fontSize={"sm"}>
            {todayWeekDay()}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
