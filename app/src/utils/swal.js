
import Swal from 'sweetalert2';

export const swalForm = (name, email, phone, password, callback) => {
    Swal.fire({
        title: name.length > 0 ? 'Update record' : 'Create record',
        html: `<input id="txt-name" class="swal2-input" placeholder="Name" value='${name}' />
            <input id="txt-email" class="swal2-input" placeholder="Email" value='${email}' />
            <input id="txt-phone" class="swal2-input" placeholder="Phone" value='${phone}' />
            <input id="txt-password" type="password" class="swal2-input" placeholder="Password" value='${password}' />`,
        showCancelButton: true,
        confirmButtonText: name.length > 0 ? 'Update' : 'Create',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            const name = document.getElementById('txt-name').value;
            const email = document.getElementById('txt-email').value;
            const phone = document.getElementById('txt-phone').value;
            const password = document.getElementById('txt-password').value;
            if (!name || !email || !phone || !password)
                return Swal.showValidationMessage(`Please provide all fields.`);
        },
    }).then(result => {
        if(result.value) {
            const name = document.getElementById('txt-name').value;
            const email = document.getElementById('txt-email').value;
            const phone = document.getElementById('txt-phone').value;
            const password = document.getElementById('txt-password').value;
            callback({name, email, phone, password});
        }
    });
}

export const swalDeleteForm = ({ callback }) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then(result => {
        if (result.value) {
            callback();
        }
    });
}

export const swalError = message => {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: true
    });
}

export const swalSuccess = message => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 800
    });
}

export const swalInfo = message => {
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: message,
        showConfirmButton: true
    });
}