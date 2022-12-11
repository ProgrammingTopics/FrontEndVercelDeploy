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
    footer: "Send a ticket to Marcelo",
    confirmButtonColor: "#2D96E1",
  });
};

export const missingFields = () => {
  Swal.fire({
    title: "Error!",
    icon: "error",
    footer: "Complete all required fields",
    confirmButtonColor: "#2D96E1",
    customClass: {
      container: "my-swal",
    },
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
    footer: "Send a ticket to Marcelo",
    confirmButtonColor: "#2D96E1",
  });
};

export const taskError = () => {
  Swal.fire({
    icon: "error",
    title: "ERROR",
    text: "Error creating task",
    footer: "Send a ticket to Marcelo",
    confirmButtonColor: "#2D96E1",
  });
};

export const repoNotFound = () => {
  Swal.fire({
    icon: "error",
    title: "ERROR",
    text: "Error repository not found, please check the ULR",
    confirmButtonColor: "#2D96E1",
  });
};
