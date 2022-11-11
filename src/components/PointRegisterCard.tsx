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
import { userType } from "../types";
import { todayDate, todayWeekDay } from "./utils/dateController";

export default function PointRegisterCard({ user }: { user: userType }) {
  const [clockState, setClockState] = useState("");

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);

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
          <Avatar size="2xl" name={user.name} />
          <Flex direction={"column"}>
            <Text> {user.name} </Text>
            <Text color={"gray.500"} ms={"1em"}>
              {user.role}
            </Text>
            <Text color={"gray.500"} ms={"1.5em"}>
              {user.team}
            </Text>
            <Text color={"gray.500"} ms={"1em"}>
              {todayDate()}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Flex direction={"column"}>
            <Text>Entry time:</Text>
            <Text>20:00</Text>
          </Flex>
          <Spacer></Spacer>
          <Flex direction={"column"}>
            <Text>Exit time:</Text>
            <Text>20:00</Text>
          </Flex>
        </Flex>
        <Stack pt={10} align={"center"}>
          <Flex>
            <Button
              onClick={() => {
                console.log(clockState);
              }}
            >
              Entry
            </Button>
            <Button
              ms="1em"
              onClick={() => {
                console.log(clockState);
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
