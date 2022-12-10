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

export default function SignUpForm({ onClose }: { onClose: () => void }) {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getTeamMembers();
  }, []);
  const [newTask, setNewTask] = useState<taskType>({
    status: "",
    name: "",
    assign: [],
    gitRepo: "",
    description: "",
  });

  const getTeamMembers = async () => {
    setTeam(await getTeam(UserManager.getTeam()));
  };
  const onChangeSetState = (newValue: string, field: string) => {
    setNewTask((prevState) => ({ ...prevState, [field]: newValue }));
  };

  const onClickSubmit = () => {
    onClose();
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
        <FormControl isRequired w="50%">
          <FormLabel>Git Repository URL</FormLabel>
          <Select
            value={newTask.assign}
            onChange={(e) => onChangeSetState(e.target.value, "assign")}
            placeholder="Select User Type"
          >
            {}
          </Select>
        </FormControl>
      </HStack>
      <Textarea
        mt="1rem"
        placeholder="Description"
        size="sm"
        resize={"vertical"}
      />
      <HStack mt="1.5rem" mb="0.5rem" justify="flex-end">
        <Button mx="1rem" onClick={() => onClickSubmit()} colorScheme="green">
          Delegate!
        </Button>
        <Button onClick={onClose}>Close</Button>
      </HStack>
    </>
  );
}
