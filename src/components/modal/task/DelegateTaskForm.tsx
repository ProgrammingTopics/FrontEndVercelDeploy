import { useEffect, useState } from "react";
import { taskType, teamMemberType } from "../../../types";
import {
  FormControl,
  Input,
  FormLabel,
  HStack,
  Select,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { createTask, updateTask, getTeam } from "../../../api";
import UserManager from "../../utils/userController";
import { delegated, missingFields, taskError } from "../../../sweetalert2";

export default function SignUpForm({ onClose }: { onClose: () => void }) {
  const [team, setTeam] = useState<teamMemberType[]>([]);

  useEffect(() => {
    getTeamMembers();
  }, []);
  const [newTask, setNewTask] = useState<taskType>({
    taskId: "",
    status: "",
    name: "",
    assigns: "",
    githubUrl: "",
    description: "",
  });

  const getTeamMembers = async () => {
    setTeam(await getTeam(UserManager.getTeam()));
  };
  const onChangeSetState = (newValue: string, field: string) => {
    setNewTask((prevState) => ({ ...prevState, [field]: newValue }));
  };

  const renderTeam = () => {
    return team.map((user) => (
      <option value={user.userId}>{user.fullName}</option>
    ));
  };

  const onClickSubmit = () => {
    let git: string;
    newTask.githubUrl === ""
      ? (git = "No repository")
      : (git = newTask.githubUrl);
    if (validateDelegate()) {
      createTask(newTask.name, git, newTask.description).then((res) => {
        updateTask(res.id, newTask.assigns).then(
          (response: { status: boolean }) => {
            if (response.status) {
              delegated();
              onClose();
            } else {
              taskError();
            }
          }
        );
      });
    } else {
      missingFields();
    }
  };

  const validateDelegate = () => {
    if (
      newTask.name === "" ||
      newTask.description === "" ||
      newTask.assigns === ""
    )
      return false;
    return true;
  };

  return (
    <>
      <HStack>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            value={newTask.name}
            onChange={(event) => onChangeSetState(event.target.value, "name")}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Assign</FormLabel>
          <Select
            value={newTask.assigns}
            onChange={(e) => onChangeSetState(e.target.value, "assigns")}
            placeholder="Choose an assigner"
          >
            {renderTeam()}
          </Select>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl>
          <FormLabel>Git Repository URL</FormLabel>
          <Input
            placeholder="Git Repository"
            value={newTask.githubUrl}
            onChange={(event) =>
              onChangeSetState(event.target.value, "githubUrl")
            }
          />
        </FormControl>
      </HStack>
      <FormControl isRequired>
        <FormLabel mt=".5rem" mb="-0.5rem">
          Description
        </FormLabel>
        <Textarea
          value={newTask.description}
          onChange={(e) => onChangeSetState(e.target.value, "description")}
          mt="1rem"
          placeholder="Description"
          size="sm"
          resize={"vertical"}
        />
      </FormControl>
      <HStack mt="1.5rem" mb="0.5rem" justify="flex-end">
        <Button mx="1rem" onClick={() => onClickSubmit()} colorScheme="green">
          Delegate!
        </Button>
        <Button onClick={onClose}>Close</Button>
      </HStack>
    </>
  );
}
