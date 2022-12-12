import {
  Button,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useMediaQuery,
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
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
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
      <Modal
        isCentered
        size={isLargerThan450 ? "xl" : "xs"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <OverlayOne />
        <ModalContent minW={isLargerThan450 ? "800px" : "0"}>
          <ModalHeader>New People!!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignUpForm
              isMobile={isLargerThan450 ? false : true}
              tableController={tableController}
              onClose={onClose}
            ></SignUpForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
