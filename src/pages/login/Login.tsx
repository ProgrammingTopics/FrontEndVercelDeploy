import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManager from "../../components/utils/userController";
import { loginIncorrectAlert } from "../../sweetalert2";
import { signInGraphRequest } from "../../api";
import { validatePassword, validateEmail } from "./loginController";
import { Md5 } from "ts-md5";

export default function Login() {
  const navigate = useNavigate();
  const handleRoute = (path: string) => navigate(path);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    emailErrorMessage: "",
    passwordErrorMessage: "",
  });
  const [show, setShow] = useState(false);
  const handleOnClick = async () => {
    const signInResult = await signInGraphRequest(email, Md5.hashStr(password));
    if (signInResult.status === false) {
      loginIncorrectAlert();
      return;
    }
    UserManager.setUser(
      signInResult.userId,
      signInResult.email,
      signInResult.fullName,
      signInResult.role,
      signInResult.team,
      signInResult.userType,
      signInResult.lastTimeStamp
    );
    handleRoute("/Home");
  };

  const buttonController = () => (!email || !password ? true : false);
  const handleClick = () => setShow(!show);

  return (
    <Center flexDirection="column" mt="5em">
      <Flex
        background="#FAF8FF"
        direction="column"
        alignItems="center"
        p="12"
        rounded="md"
        boxShadow="2xl"
        width={[350, 450, 600]}
        minHeight="320px"
      >
        <Text color="#2D96E1" fontSize="4xl" mb="0.5em" fontWeight="extrabold">
          Login
        </Text>
        <FormControl isInvalid={!!errorMessages.emailErrorMessage}>
          <Input
            onBlur={() => {
              validateEmail(setErrorMessages, email);
            }}
            errorBorderColor="red.500"
            type="text"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Input>
          {!!errorMessages.emailErrorMessage ? (
            <FormErrorMessage>
              {errorMessages.emailErrorMessage}
            </FormErrorMessage>
          ) : (
            <></>
          )}
        </FormControl>
        <FormControl isInvalid={!!errorMessages.passwordErrorMessage}>
          <InputGroup size="md">
            <Input
              errorBorderColor="red.500"
              type={show ? "text" : "password"}
              placeholder="Password"
              onBlur={() => {
                validatePassword(setErrorMessages, password);
              }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              mt="0.5em"
            ></Input>
            <InputRightElement width="4.5rem">
              <Button
                mt="1rem"
                h="40px"
                size="md"
                onClick={handleClick}
                bg="none"
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
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
