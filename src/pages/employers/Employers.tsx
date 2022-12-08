import {
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
import SignUpModal from "../../components/modal/SignUpModal";
import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";
import { omitPasswordUserType } from "../../types";
import GenerateReportModal from "../../components/modal/GenerateReportModal";

export default function Employers() {
  const [Employees, setEmployees] = useState<omitPasswordUserType[]>([
    {
      id: "123412",
      email: "igor.si",
      fullName: "igor shinji",
      role: "intern",
      team: "TI",
      valuePerHour: 500,
      userType: "default",
    },
  ]);

  useEffect(() => {}, []);
  const getEmployees = async () => {
    setEmployees(await getEmployersList(UserManager.getUserType()));
  };
  const TdData = () =>
    Employees.map((employe) => {
      return (
        <Tr>
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
            <SignUpModal userID={employe.id}></SignUpModal>
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
