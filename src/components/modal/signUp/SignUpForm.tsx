import { useState } from "react";
import { employeesTable, omitHoursWorkedType } from "../../../types";
import {
  FormControl,
  Input,
  FormLabel,
  HStack,
  Select,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { signUpApi } from "../../../api";
import {
  missingFields,
  signUpFailed,
  signUpSuccess,
} from "../../../sweetalert2";
import {Md5} from 'ts-md5';

export default function SignUpForm({
  onClose,
  tableController,
}: {
  onClose: () => void;
  tableController: React.Dispatch<React.SetStateAction<employeesTable[]>>;
}) {
  const [userInfo, setUserInfo] = useState<omitHoursWorkedType>({
    id: "",
    fullName: "",
    email: "",
    password: "",
    role: "",
    team: "",
    userType: "",
    valuePerHour: 0,
  });
  const validateFields = () => {
    if (
      userInfo.fullName === "" ||
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.role === "" ||
      userInfo.team === "" ||
      userInfo.team === "" ||
      userInfo.valuePerHour === 0
    )
      return false;
    return true;
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChangeSetState = (newValue: string, field: string) => {
    setUserInfo((prevState) => ({ ...prevState, [field]: newValue }));
  };
  const [isError, setIsError] = useState(false);

  const validatePassword = () => {
    userInfo.password === confirmPassword
      ? setIsError(false)
      : setIsError(true);
  };

  const onClickSubmit = () => {
    if (validateFields()) {
      console.log(userInfo);
      signUpApi(
        userInfo.email,
        Md5.hashStr(userInfo.password),
        userInfo.role,
        userInfo.team,
        userInfo.userType,
        userInfo.fullName,
        userInfo.valuePerHour
      ).then((res) => {
        if (res.status) {
          signUpSuccess();
          const formatedEmployer = JSON.parse(JSON.stringify(userInfo));
          delete formatedEmployer["password"];
          formatedEmployer.concatFields = Object.values(formatedEmployer)
            .flat()
            .join()
            .toUpperCase();
          tableController((prevState) => prevState.concat(formatedEmployer));
        } else {
          signUpFailed();
        }
      });
      onClose();
    } else {
      missingFields();
    }
  };
  return (
    <>
      <HStack>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Full Name"
            value={userInfo.fullName}
            onChange={(event) =>
              onChangeSetState(event.target.value, "fullName")
            }
          />
        </FormControl>
        <FormControl isRequired w="50%">
          <FormLabel>User Type</FormLabel>
          <Select
            value={userInfo.userType}
            onChange={(e) => onChangeSetState(e.target.value, "userType")}
            placeholder="Select User Type"
          >
            <option value="Default">Default</option>
            <option value="Manager">Manager</option>
            <option value="RH">RH</option>
          </Select>
        </FormControl>
      </HStack>
      <HStack mt="1rem">
        <FormControl isRequired w="120%">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            value={userInfo.email}
            onChange={(event) => onChangeSetState(event.target.value, "email")}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            value={userInfo.password}
            onChange={(event) =>
              onChangeSetState(event.target.value, "password")
            }
          />
        </FormControl>
        <FormControl isRequired isInvalid={isError}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            onBlur={() => {
              validatePassword();
            }}
          />
          {!isError ? (
            <></>
          ) : (
            <FormErrorMessage>
              Confirm and password should match.
            </FormErrorMessage>
          )}
        </FormControl>
      </HStack>
      <HStack mt="1rem">
        <FormControl isRequired w="60%">
          <FormLabel>Role</FormLabel>
          <Input
            placeholder="Role"
            value={userInfo.role}
            onChange={(event) => onChangeSetState(event.target.value, "role")}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Team</FormLabel>
          <Input
            placeholder="Team"
            value={userInfo.team}
            onChange={(event) => onChangeSetState(event.target.value, "team")}
          />
        </FormControl>
        <FormControl isRequired w="30%">
          <FormLabel>$ / Hour</FormLabel>
          <Input
            placeholder="$"
            value={userInfo.valuePerHour}
            onChange={(event) =>
              onChangeSetState(event.target.value, "valuePerHour")
            }
          />
        </FormControl>
      </HStack>
      <HStack mt="1.5rem" mb="0.5rem" justify="flex-end">
        <Button
          mx="1rem"
          onClick={() => onClickSubmit()}
          type="submit"
          colorScheme="green"
        >
          Hired!
        </Button>
        <Button onClick={onClose}>Close</Button>
      </HStack>
    </>
  );
}
