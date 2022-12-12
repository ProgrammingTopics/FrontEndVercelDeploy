import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Heading, HStack, Text, Button, Spacer, Link } from "@chakra-ui/react";
import { taskType } from "../../types";
import { AiFillGithub } from "react-icons/ai";

export default function taskCard({ task }: { task: taskType }) {
  function isValidHttpUrl(string: string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

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
          {isValidHttpUrl(task.githubUrl) ? (
            <Button bg="none" _hover={{ bg: "none" }} _active={{ bg: "none" }}>
              <Link href={task.githubUrl} isExternal>
                <AiFillGithub size={50}></AiFillGithub>
              </Link>
            </Button>
          ) : (
            <></>
          )}
        </HStack>
      </CardBody>
    </Card>
  );
}
