import {
  Button,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import DelegateTaskForm from "./DelegateTaskForm";
import { useMediaQuery } from "@chakra-ui/react";

export default function DelegateTaskModal({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [isLargerThan1800] = useMediaQuery("(min-width: 1800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isLargerThan1800 || isMobile ? (
        <Button
          flex={1}
          size="lg"
          fontSize={"lg"}
          rounded={"full"}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
          onClick={onOpen}
        >
          Delegate a New Task
        </Button>
      ) : (
        <Button
          flex={1}
          size="lg"
          fontSize={"lg"}
          rounded={"full"}
          bg={"blue.400"}
          onClick={onOpen}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
        >
          <Text fontWeight="extrabold">+</Text>
        </Button>
      )}
      <Modal
        isCentered
        size={isMobile ? "xs" : "xl"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <OverlayOne />
        <ModalContent minW={isMobile ? "0" : "800px"}>
          <ModalHeader>Delegate a New Task!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DelegateTaskForm onClose={onClose}></DelegateTaskForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
