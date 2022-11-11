import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInGraphRequest } from "../../api";
import { validatePassword, validateUser } from "./loginController";

export default function Login() {
  const navigate = useNavigate();
  const handleRoute = (path: string) => navigate(path);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    userErrorMessage: "",
    passwordErrorMessage: "",
  });

  const handleOnClick = async () => {
    const signInResult = await signInGraphRequest(user, password);
    handleRoute("/home");
  };

  const buttonController = () => (!user || !password ? true : false);

  return (
    <Center flexDirection="column" mt="5em">
      <Flex
        background="#FAF8FF"
        direction="column"
        alignItems="center"
        p="12"
        rounded="md"
        boxShadow="2xl"
        width={[200, 300, 430]}
        minHeight="320px"
      >
        <Text color="#2D96E1" fontSize="4xl" mb="0.5em" fontWeight="extrabold">
          Login
        </Text>
        <FormControl isInvalid={!!errorMessages.userErrorMessage}>
          <Input
            onBlur={() => {
              validateUser(setErrorMessages, user);
            }}
            errorBorderColor="red.500"
            type="text"
            placeholder="User"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          ></Input>
          {!!errorMessages.userErrorMessage ? (
            <FormErrorMessage>
              {errorMessages.userErrorMessage}
            </FormErrorMessage>
          ) : (
            <></>
          )}
        </FormControl>
        <FormControl isInvalid={!!errorMessages.passwordErrorMessage}>
          <Input
            errorBorderColor="red.500"
            type="password"
            placeholder="Password"
            onBlur={() => {
              validatePassword(setErrorMessages, password);
            }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            mt="0.5em"
          ></Input>
          {!!errorMessages.passwordErrorMessage ? (
            <FormErrorMessage>
              {errorMessages.passwordErrorMessage}
            </FormErrorMessage>
          ) : (
            <></>
          )}
        </FormControl>
        <Button
          disabled={buttonController()}
          type="submit"
          background="#00B5EA"
          mt="1em"
          onClick={handleOnClick}
        >
          Log In
        </Button>
      </Flex>
    </Center>
  );
}
