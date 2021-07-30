
import Swal from 'sweetalert2';

export const swalForm = (title, description, skills, callback) => {
    Swal.fire({
        title: title && title.length > 0 ? 'Update job' : 'Create job',
        html: `<input id="txt-title" class="swal2-input" placeholder="Title" value='${title}' />
            <input id="txt-description" class="swal2-input" placeholder="Description" value='${description}' />
            <input id="txt-skills" class="swal2-input" placeholder="Skills" value='${skills}' />`,
        showCancelButton: true,
        confirmButtonText: title.length > 0 ? 'Update' : 'Create',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            const title = document.getElementById('txt-title').value;
            const description = document.getElementById('txt-description').value;
            const skills = document.getElementById('txt-skills').value;
            if (!title || !description || !skills)
                return Swal.showValidationMessage(`Please provide all fields.`);
        },
    }).then(result => {
        if(result.value) {
            const title = document.getElementById('txt-title').value;
            const description = document.getElementById('txt-description').value;
            const skills = document.getElementById('txt-skills').value;
            callback({title, description, skills});
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