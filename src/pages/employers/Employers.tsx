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
import Sidebar from "../../components/Sidebar";
import UserManager from "../../components/utils/userController";
import { userType } from "../../types";

export default function Employers() {
  const [Employees, setEmployees] = useState<userType[]>([
    {
      email: "igor.si",
      fullName: "igor shinji",
      role: "intern",
      team: "TI",
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
          <Table variant="simple">
            <TableCaption>Functionary Table</TableCaption>
            <Thead>
              <Tr>
                <Th>Func. ID</Th>
                <Th>Full Name</Th>
                <Th>Role</Th>
                <Th>Team</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>{TdData()}</Tbody>
          </Table>
        </TableContainer>
      </Sidebar>
    );
}
