import { Stack, Heading, Text, Button } from "@chakra-ui/react";

import { getRepositoryByName } from "../../api";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { gitRepoType } from "../../types";

export default function Tasks() {
  const [tasks, setTasks] = useState<gitRepoType[]>([]);

  useEffect(() => {
    getTasksInfo("https://github.com/ProgrammingTopics/RH-Back");
  }, []);

  const getTasksInfo = (url: string) => {
    const splittedLink = url.split(".com/", 2);
    const userAndRepo = splittedLink[1].split("/", 2);
    const user = userAndRepo[0];
    const repo = userAndRepo[1];
    getRepositoryByName(user).then((result: gitRepoType[]) => {
      result.forEach((repository) => {
        if (repository.name === repo)
          setTasks((prevState) => prevState.concat(repository));
      });
    });
  };
  const handleOnClick = () => {
    console.log(tasks);
  };

  return (
    <Sidebar>
      Tasks
      <Stack spacing="4">
        {["md"].map((size) => (
          <Card key={size} size={size}>
            <CardHeader>
              <Heading size="md">{tasks[0].name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>size = {size}</Text>
              <Button colorScheme="blue" onClick={handleOnClick}>
                Button
              </Button>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </Sidebar>
  );
}
