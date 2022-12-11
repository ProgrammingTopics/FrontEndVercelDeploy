import { useState } from "react";
import { employeesTable, omitHoursWorkedAndPasswordType } from "../../../types";
import {
  FormControl,
  Input,
  FormLabel,
  HStack,
  Select,
  Button,
} from "@chakra-ui/react";
import { editEmployeeInfo, fireEmployerById } from "../../../api";
import { editFailed, editSuccess } from "../../../sweetalert2";
import Swal from "sweetalert2";

export default function EditForm({
  employee,
  onClose,
  tableController,
}: {
  employee: employeesTable;
  onClose: () => void;
  tableController: React.Dispatch<React.SetStateAction<employeesTable[]>>;
}) {
  const [userInfo, setUserInfo] = useState<omitHoursWorkedAndPasswordType>({
    id: employee.id,
    fullName: employee.fullName,
    email: employee.email,
    role: employee.role,
    team: employee.team,
    userType: employee.userType,
    valuePerHour: employee.valuePerHour,
  });
  const onChangeSetState = (newValue: string, field: string) => {
    setUserInfo((prevState) => ({ ...prevState, [field]: newValue }));
  };
  const onClickSubmit = () => {
    editEmployeeInfo(
      userInfo.id,
      userInfo.email,
      userInfo.role,
      userInfo.team,
      userInfo.userType,
      userInfo.fullName,
      userInfo.valuePerHour
    ).then((res) => {
      if (res.status) {
        editSuccess();
        tableController((prevState) =>
          prevState.map((obj) => {
            if (obj.id === userInfo.id) {
              return {
                ...obj,
                email: userInfo.email,
                role: userInfo.role,
                team: userInfo.team,
                userType: userInfo.userType,
                fullName: userInfo.fullName,
                valuePerHour: userInfo.valuePerHour,
              };
            }
            return obj;
          })
        );
      } else {
        editFailed();
      }
    });
    onClose();
  };

  const onClickFire = () => {
    onClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, fire it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fireEmployerById(employee.id).then(
          (res: { status: boolean; mustBePaid: number }) => {
            if (res.status) {
              Swal.fire(
                "Deleted!",
                "Employee files has been deleted.",
                "success"
              );
              tableController((prevState) =>
                prevState.filter((emp) => emp.id !== employee.id)
              );
            } else {
              editFailed();
            }
          }
        );
      }
    });
  };

  return (
    <>
      <HStack>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Full Name"
            value={userInfo.fullName}
            onChange={(event) =>
              onChangeSetState(event.target.value, "fullName")
            }
          />
        </FormControl>
        <FormControl isRequired w="50%">
          <FormLabel>User Type</FormLabel>
          <Select
            value={userInfo.userType}
            onChange={(e) => onChangeSetState(e.target.value, "userType")}
          >
            <option value="Default">Default</option>
            <option value="Manager">Manager</option>
            <option value="RH">RH</option>
          </Select>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl isRequired w="60%">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            value={userInfo.email}
            onChange={(event) => onChangeSetState(event.target.value, "email")}
          />
        </FormControl>
      </HStack>
      <HStack>
        <FormControl isRequired w="60%">
          <FormLabel>Role</FormLabel>
          <Input
            placeholder="Role"
            value={userInfo.role}
            onChange={(event) => onChangeSetState(event.target.value, "role")}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Team</FormLabel>
          <Input
            placeholder="Team"
            value={userInfo.team}
            onChange={(event) => onChangeSetState(event.target.value, "team")}
          />
        </FormControl>
        <FormControl isRequired w="30%">
          <FormLabel>$ / Hour</FormLabel>
          <Input
            placeholder="$"
            value={userInfo.valuePerHour}
            type="number"
            onChange={(event) =>
              onChangeSetState(event.target.value, "valuePerHour")
            }
          />
        </FormControl>
      </HStack>
      <HStack mt="1.5rem" mb="0.5rem" justify="flex-end">
        <Button ml="1rem" onClick={() => onClickSubmit()} colorScheme="green">
          Save
        </Button>
        <Button ml="1rem" onClick={() => onClickFire()} colorScheme="red">
          Fire!
        </Button>
        <Button onClick={onClose}>Close</Button>
      </HStack>
    </>
  );
}
