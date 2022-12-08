import {
  Button,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { HiDocumentReport } from "react-icons/hi";

export default function GenerateReportModal({ userID }: { userID: string }) {
  useEffect(() => {}, []);

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
        <HiDocumentReport />
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
