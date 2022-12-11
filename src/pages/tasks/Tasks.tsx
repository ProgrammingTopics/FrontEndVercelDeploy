import { Stack, Heading, HStack, Text, Button, Center } from "@chakra-ui/react";
import { getRepositoryByName } from "../../api";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { gitRepoType } from "../../types";
import {AiFillGithub} from "react-icons/ai"
import { repoNotFound, taskError } from "../../sweetalert2";

export default function Tasks() {
  const [tasks, setTasks] = useState<gitRepoType[]>([
    {
      owner:{
        login: "aaa"
      },
      name: "bbb",
      id: 123,
    },
  ]);

  useEffect(() => {
    getTasksInfo("https://github.com/ProgrammingTopics/RH-Back");
  }, []);

  const getTasksInfo = (url: string) => {
    const splittedLink = url.split(".com/", 2);
    const userAndRepo = splittedLink[1].split("/", 2);
    const user = userAndRepo[0];
    const repo = userAndRepo[1];
    let repoFound=0;
    getRepositoryByName(user).then((result: gitRepoType[]) => {
      result.forEach((repository) => {
        if (repository.name === repo){
          setTasks((prevState) => prevState.concat(repository));
          repoFound=1;
        }
      });
      if(repoFound===0){
        repoNotFound();
      }
    }).catch(taskError);
  };


  const handleOnClick = () => {
    console.log(tasks);
  };

  return (
    <Sidebar>
      <Text fontSize='3xl'> Tasks</Text>
      <Card maxW="1000" mx="auto"
      rounded="md"
      bg= "linear-gradient(to right top, #f8f8f8, #f2f1f1, #eceaea, #e5e3e2, #ddddda)"
      p="2rem"
      size={"sm"}
      _hover={{bg: "white", }}>
      <CardHeader>
        <Heading  borderRadius='lg' size="md">{tasks[0].name}</Heading>
      </CardHeader>
      <CardBody>
        <HStack>
          <Text>Líder: {tasks[0].owner.login}</Text>
        </HStack>
        <HStack>
          <AiFillGithub size={50}>Abrir Repositório</AiFillGithub>
        </HStack>
      </CardBody>
      </Card>

    </Sidebar>
  );
}
