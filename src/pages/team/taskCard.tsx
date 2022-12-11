import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Heading, HStack, Text, Button } from "@chakra-ui/react";
import { taskType } from "../../types";
import { AiFillGithub } from "react-icons/ai";

export default function TaskCard({ task }: { task: taskType }) {
  return (
    <Card
      key={task.name}
      size={"sm"}
      bg={task.taskStatus === "Completed" ? "green.50" : "yellow.50"}
      w="100%"
      rounded="md"
      p="1rem"
      _hover={{
        bg: "white",
      }}
    >
      <CardHeader>
        <Heading borderRadius="lg" size="md">
          {task.name}
        </Heading>
      </CardHeader>
      <CardBody>
        <HStack>
          <Text as="b">{task.description}</Text>
        </HStack>
        <HStack>
          <Text>Assigned to:</Text>
          <Text>{task.assign1}</Text>
          {task.assign2 ? <Text>{task.assign2}</Text> : <></>}
        </HStack>
        <HStack>
          <Button bg="none" _hover={{ bg: "none" }} _active={{ bg: "none" }}>
            <AiFillGithub size={50}>Abrir Repositório</AiFillGithub>
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
}
