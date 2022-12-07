import Swal from 'sweetalert2'

export const loginIncorrectAlert = () => {
    Swal.fire(
        {
        title: "E-mail ou senha incorretas",
         icon: "error",
         confirmButtonColor: '#2D96E1',
        }

    )
}