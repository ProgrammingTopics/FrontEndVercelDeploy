import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Heading, HStack, Text } from "@chakra-ui/react";
import { taskType } from "../../types";

export default function TaskCard({ task }: { task: taskType }) {
  const asignUsers = () =>
    task.assign.map((employee) => <Text>{employee}</Text>);

  return (
    <Card
      key={task.name}
      size={"sm"}
      bg={task.status === "Completed" ? "green.200" : "yellow.100"}
      w="100%"
      rounded="md"
      p="1rem"
    >
      <CardHeader>
        <Heading size="md">{task.name}</Heading>
      </CardHeader>
      <CardBody>
        <HStack>
          <Text as="b">{task.description}</Text>
        </HStack>
        <HStack>
          <Text>Assigned to:</Text> {asignUsers()}
        </HStack>
      </CardBody>
    </Card>
  );
}
