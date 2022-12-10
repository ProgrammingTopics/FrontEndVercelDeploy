import Swal from "sweetalert2";

export const loginIncorrectAlert = () => {
  Swal.fire({
    title: "E-mail ou senha incorretas",
    icon: "error",
    confirmButtonColor: "#2D96E1",
  });
};

export const signUpSuccess = () => {
  Swal.fire({
    title: "Employee Hired!",
    icon: "success",
    confirmButtonColor: "#2D96E1",
  });
};

export const signUpFailed = () => {
  Swal.fire({
    title: "Error!",
    icon: "error",
    footer: "Send a ticket to URL",
    confirmButtonColor: "#2D96E1",
  });
};

export const editSuccess = () => {
  Swal.fire({
    title: "Employee Info Updated!",
    icon: "success",
    confirmButtonColor: "#2D96E1",
  });
};

export const editFailed = () => {
  Swal.fire({
    title: "Error!",
    icon: "error",
    footer: "Send a ticket to URL",
    confirmButtonColor: "#2D96E1",
  });
};
