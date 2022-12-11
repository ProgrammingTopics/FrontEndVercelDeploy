import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Heading, HStack, Text, Button, Spacer, Link } from "@chakra-ui/react";
import { taskType } from "../../types";
import { AiFillGithub } from "react-icons/ai";

export default function TeamTaskCard({ task }: { task: taskType }) {
  return (
    <Card
      key={task.name}
      size={"sm"}
      bg="blue.100"
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
          <Spacer></Spacer>
          {task.gitRepo ? (
            <Button bg="none" _hover={{ bg: "none" }} _active={{ bg: "none" }}>
              <Link href={task.gitRepo} isExternal>
                <AiFillGithub size={50}></AiFillGithub>
              </Link>
            </Button>
          ) : (
            <></>
          )}
        </HStack>
        <Text>Assigned to: {task.assign}</Text>
      </CardBody>
    </Card>
  );
}
