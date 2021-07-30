import React, {useState, useEffect} from 'react';
import userService from "../services/user";
import {swalError, swalSuccess, swalInfo, swalForm} from "../utils/swal";
import $ from 'jquery';
import dt from 'datatables.net';

export default function Users(props) {
    const [rows, setRows] = useState([]);
    const [api, setApi] = useState(null);
    useEffect(() => {
        (async () => reload())();
    }, []);

    const handleCreate = e => {
        e.preventDefault();

        swalForm('', '', '', '', async val => {
                await userService.add(val.name, val.email, val.phone, val.password)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    swalSuccess('User added successfully!');
                    destroy();
                    reload();
                });
            });
    }

    const destroy = () => {
        const table = $('#table').DataTable();
        table.destroy();
    }

    const reload = async () => {
        await userService.getAll()
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                const data = result.data;
                const table = $('#table').DataTable({
                    columns: [
                        { data: 'name', title: 'Name' },
                        { data: 'email', title: 'Email' },
                        { data: 'phone', title: 'Phone' },
                        { data: 'password', title: 'Password' }
                    ],
                    data: data
                });

                $('#table tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                $('#btn-delete').click(function () {
                    if(!table.row('.selected').data()) {
                        swalInfo('Select a row to delete it.');
                        return;
                    }

                    const id = table.row('.selected').data()._id;
                    userService.delete(id).then(function (result) {
                        if (result.error) {
                            swalError(result.error);
                            return;
                        }

                        swalSuccess('User deleted successfully!');
                        table.row('.selected').remove().draw(false);
                    });
                });

                $('#btn-edit').click(function () {
                    if(!table.row('.selected').data()) {
                        swalInfo('Select a row to edit it.');
                        return;
                    }
                    const data = table.row('.selected').data();
                    swalForm(data.name, data.email, data.phone, data.password, values => {
                        userService.update(data._id, values).then(result => {
                            if (result.error) {
                                swalError(result.error);
                                return;
                            }

                            swalSuccess('User updated successfully!');
                            table.row('.selected').data({
                                ...data,
                                name: values.name,
                                email: values.email,
                                phone: values.phone,
                                password: values.password
                            });
                        });
                    });
                });
            });
    }

    return (
        <div className="container-fluid" style={{marginTop: '30px'}}>
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <h4>Users</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-12 text-right">
                    <button className="btn btn-outline-primary btn-sm m-1" onClick={e => handleCreate(e)}>Create</button>
                    <button id="btn-delete" className="btn btn-outline-danger btn-sm m-1">Delete selected row</button>
                    <button id="btn-edit" className="btn btn-outline-info btn-sm m-1">Edit selected row</button>
                </div>
            </div>
            <div className="row" style={{marginTop: '30px'}}>
                <div className="col-sm-12 col-md-12">
                    <table id="table" className="table table-striped table-hover" style={{border: '1px solid #000'}}></table>
                </div>
            </div>
        </div>
    );
}