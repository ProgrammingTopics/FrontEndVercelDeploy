import {
  Button,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FcPlus } from "react-icons/fc";
import { employeesTable } from "../../../types";
import SignUpForm from "./SignUpForm";

export default function SignUpModal({
  tableController,
}: {
  tableController: React.Dispatch<React.SetStateAction<employeesTable[]>>;
}) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="md"
        colorScheme="cyan"
        variant="outline"
        border="hidden"
        onClick={() => {
          onOpen();
        }}
      >
        <FcPlus size={28} />
      </Button>
      <Modal isCentered size={"xl"} isOpen={isOpen} onClose={onClose}>
        <OverlayOne />
        <ModalContent minW="800px">
          <ModalHeader>New People!!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignUpForm
              tableController={tableController}
              onClose={onClose}
            ></SignUpForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
