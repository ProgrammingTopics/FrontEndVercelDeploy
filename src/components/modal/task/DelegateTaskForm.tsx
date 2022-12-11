import { useEffect, useState } from "react";
import { taskType } from "../../../types";
import {
  FormControl,
  Input,
  FormLabel,
  HStack,
  Select,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { getTeam } from "../../../api";
import UserManager from "../../utils/userController";
import { missingFields } from "../../../sweetalert2";

export default function SignUpForm({ onClose }: { onClose: () => void }) {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getTeamMembers();
  }, []);
  const [newTask, setNewTask] = useState<taskType>({
    status: false,
    taskStatus: "",
    name: "",
    assign1: "",
    assign2: "",
    gitRepo: "",
    description: "",
  });

  const getTeamMembers = async () => {
    setTeam(await getTeam(UserManager.getTeam()));
  };
  const onChangeSetState = (newValue: string, field: string) => {
    setNewTask((prevState) => ({ ...prevState, [field]: newValue }));
  };

  const renderTeam = () => {
    return team.map((user) => <option>{user}</option>);
  };

  const onClickSubmit = () => {
    if (validateDelegate()) {
      onClose();
    } else {
      missingFields();
    }
  };

  const validateDelegate = () => {
    if (
      newTask.name === "" ||
      newTask.description === "" ||
      newTask.assign1 === ""
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
            value={newTask.assign1}
            onChange={(e) => onChangeSetState(e.target.value, "assign1")}
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
            value={newTask.gitRepo}
            onChange={(event) =>
              onChangeSetState(event.target.value, "gitRepo")
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Assign Helper</FormLabel>
          <Select
            value={newTask.assign2}
            onChange={(e) => onChangeSetState(e.target.value, "assign2")}
            placeholder="Choose an assigner"
          >
            {renderTeam()}
          </Select>
        </FormControl>
      </HStack>
      <FormControl isRequired>
        <FormLabel mt=".5rem" mb="-0.5rem">
          Description
        </FormLabel>
        <Textarea
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
