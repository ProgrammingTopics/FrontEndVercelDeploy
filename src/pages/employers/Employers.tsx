import {
  Button,
  Container,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getEmployersList } from "../../api";
import SignUpModal from "../../components/modal/signUp/SignUpModal";
import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";
import { employeesTable } from "../../types";
import EditModal from "../../components/modal/edit/EditModal";
import { BiSearchAlt } from "react-icons/bi";

export default function Employers() {
  const [Employees, setEmployees] = useState<employeesTable[]>([]);
  useEffect(() => {
    setTable(Employees);
  }, [Employees]);
  const [table, setTable] = useState<employeesTable[]>([]);
  const [queryField, setQueryField] = useState("");

  useEffect(() => {
    getEmployersList().then((res) => {
      const tableWithConcatFields = res;
      tableWithConcatFields.forEach((object: any) => {
        object.concatFields = Object.values(object).flat().join().toUpperCase();
      });
      setEmployees(tableWithConcatFields);
      setTable(tableWithConcatFields);
    });
  }, []);

  const onClickFilter = () => {
    if (queryField !== "") {
      const filteredTable = Employees.filter((employee) =>
        employee.concatFields.includes(queryField.toUpperCase())
      );
      setTable(filteredTable);
    } else {
      setTable(Employees);
    }
  };

  const onEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickFilter();
    }
  };

  const TdData = () =>
    table.map((employe, index) => {
      return (
        <Tr key={index}>
          {employe.userId ? <Td>{employe.userId}</Td> : <Td>Generating Id</Td>}
          <Td>{employe.fullName}</Td>
          <Td>{employe.role}</Td>
          <Td>{employe.team}</Td>
          <Td>{employe.valuePerHour}</Td>
          <Td>{employe.hoursWorked}</Td>
          <Td>{employe.userType}</Td>
          <Td>
            <EditModal
              tableController={setEmployees}
              employee={employe}
            ></EditModal>
          </Td>
        </Tr>
      );
    });
  if (UserManager.getUserType() !== "RH") {
    return (
      <Sidebar>Permission Denied, your role is not Human Resources</Sidebar>
    );
  } else
    return (
      <Sidebar>
        <Container my="1rem">
          <HStack>
            <InputGroup size="md">
              <Input
                placeholder="Query Employee"
                value={queryField}
                onChange={(e) => setQueryField(e.target.value)}
                onKeyDown={(e) => onEnterDown(e)}
              />
              <InputRightElement w="3.5rem">
                <Button
                  backgroundColor="none"
                  _hover={{ backgroundColor: "transparent" }}
                  _active={{ backgroundColor: "transparent" }}
                  onClick={onClickFilter}
                >
                  <BiSearchAlt size="42" />
                </Button>
              </InputRightElement>
            </InputGroup>
            <SignUpModal tableController={setEmployees}></SignUpModal>
          </HStack>
        </Container>
        <TableContainer>
          <Table variant="striped" boxShadow="xl" colorScheme="telegram">
            <TableCaption>Functionary Table</TableCaption>
            <Thead>
              <Tr>
                <Th>Func. ID</Th>
                <Th>Full Name</Th>
                <Th>Role</Th>
                <Th>Team</Th>
                <Th>$ / Hour</Th>
                <Th>Hours Worked</Th>
                <Th>User Type</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>{TdData()}</Tbody>
          </Table>
        </TableContainer>
      </Sidebar>
    );
}
