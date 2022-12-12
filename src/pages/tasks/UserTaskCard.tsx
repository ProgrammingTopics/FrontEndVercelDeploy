import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import {
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Spacer,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsPatchCheckFill } from "react-icons/bs";
import { completeTaskApi, getRepositoryByName } from "../../api";
import UserManager from "../../components/utils/userController";
import {
  repoNotFound,
  taskCompleted,
  taskError,
  ticketError,
} from "../../sweetalert2";
import { gitRepoType, taskType } from "../../types";

export default function TaskCard({
  task,
  setTasks,
}: {
  task: taskType;
  setTasks: React.Dispatch<React.SetStateAction<taskType[]>>;
}) {
  useEffect(() => {
    if (task.githubUrl) {
      getTasksInfo(task.githubUrl);
    }
  }, []);

  const [repoTaskInfo, setRepoTaskInfo] = useState({
    ownerLogin: "",
    name: "",
    id: 0,
  });

  function isValidHttpUrl(string: string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  const getTasksInfo = (url: string) => {
    if (isValidHttpUrl(url)) {
      const splittedLink = url.split(".com/", 2);
      const userAndRepo = splittedLink[1].split("/", 2);
      const user = userAndRepo[0];
      const repo = userAndRepo[1];
      let repoFound = 0;
      getRepositoryByName(user)
        .then((result: gitRepoType[]) => {
          result.forEach((repository) => {
            if (repository.name === repo) {
              setRepoTaskInfo((prevState) => ({
                ...prevState,
                ownerLogin: repository.owner.login,
                name: repository.name,
                id: repository.id,
              }));
              repoFound = 1;
            }
          });
          if (repoFound === 0) {
            repoNotFound();
          }
        })
        .catch(taskError);
    }
  };
  const completeTask = () => {
    completeTaskApi(task.taskId).then((res) => {
      if (res.status) {
        taskCompleted();
        setTasks((prevState) =>
          prevState.filter(
            (completeTask) => completeTask.taskId !== task.taskId
          )
        );
      } else {
        ticketError();
      }
    });
  };
  return (
    <Card
      key={UserManager.getId()}
      maxW="1000"
      mx="auto"
      rounded="md"
      bg="linear-gradient(to right top, #f8f8f8, #f2f1f1, #eceaea, #e5e3e2, #ddddda)"
      boxShadow="2xl"
      p="2rem"
      mb="1rem"
      size={"sm"}
      _hover={{ bg: "white" }}
    >
      <CardHeader>
        <Heading borderRadius="lg" size="md">
          {task.name}
        </Heading>
      </CardHeader>
      <CardBody>
        <HStack>
          <VStack justify={"flex-start"}>
            <HStack>
              <Text>{task.assigns}</Text>
              <Text>{task.description}</Text>
            </HStack>
            {isValidHttpUrl(task.githubUrl) ? (
              <HStack>
                <Button
                  bg="none"
                  _hover={{ bg: "none" }}
                  _active={{ bg: "none" }}
                >
                  <Link href={task.githubUrl} isExternal>
                    <AiFillGithub size={50}></AiFillGithub>
                  </Link>
                </Button>
                <Text fontSize={20} fontWeight="bold">
                  {repoTaskInfo.name}
                </Text>
              </HStack>
            ) : (
              <></>
            )}
          </VStack>

          <Spacer></Spacer>
          <Button
            bg="none"
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            onClick={() => completeTask()}
          >
            <BsPatchCheckFill size={50} style={{ color: "green" }} />
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
}
