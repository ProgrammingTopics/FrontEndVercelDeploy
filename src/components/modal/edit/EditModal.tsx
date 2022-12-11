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
import { AiFillEdit } from "react-icons/ai";
import { employeesTable } from "../../../types";
import EditForm from "./EditForm";

export default function EditModal({
  employee,
  tableController,
}: {
  employee: employeesTable;
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
        <AiFillEdit />
      </Button>
      <Modal isCentered size={"xl"} isOpen={isOpen} onClose={onClose}>
        <OverlayOne />
        <ModalContent minW="800px">
          <ModalHeader>Contract Update</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditForm
              tableController={tableController}
              onClose={onClose}
              employee={employee}
            ></EditForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
