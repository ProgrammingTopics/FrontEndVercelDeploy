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
import GenerateReportModal from "../../components/modal/GenerateReportModal";
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
    getEmployersList(UserManager.getUserType()).then((res) => {
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
          <Td>{employe.email}</Td>
          <Td>{employe.fullName}</Td>
          <Td>{employe.role}</Td>
          <Td>{employe.team}</Td>
          <Td>
            {employe.valuePerHour.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Td>
          <Td>
            <EditModal
              tableController={setEmployees}
              employee={employe}
            ></EditModal>
          </Td>
          <Td>
            <GenerateReportModal userID={employe.id}></GenerateReportModal>
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
                <Button onClick={onClickFilter}>
                  <BiSearchAlt size="42" />
                </Button>
              </InputRightElement>
            </InputGroup>
            <SignUpModal></SignUpModal>
          </HStack>
        </Container>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Functionary Table</TableCaption>
            <Thead>
              <Tr>
                <Th>Func. ID</Th>
                <Th>Full Name</Th>
                <Th>Role</Th>
                <Th>Team</Th>
                <Th>$ / Hour</Th>
                <Th>Edit</Th>
                <Th>Generate Report</Th>
              </Tr>
            </Thead>
            <Tbody>{TdData()}</Tbody>
          </Table>
        </TableContainer>
      </Sidebar>
    );
}
