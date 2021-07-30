import React, { useState, useEffect } from 'react';
import jobService from "../services/job";
import { swalError, swalSuccess, swalInfo, swalForm, swalDeleteForm } from "../utils/swal";
import $ from 'jquery';
import dt from 'datatables.net';
import moment from 'moment';

export default function Users(props) {
    useEffect(() => {
        (async () => reload())();
    }, []);

    const handleCreate = e => {
        e.preventDefault();

        swalForm('', '', '', async val => {
            let data = {
                ...val,
                dateCreated: moment().format(),
                dateUpdated: moment().format()
            };
            await jobService.add(data)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    swalSuccess('Job added successfully!');
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
        await jobService.getAll()
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                const data = result.data;
                const table = $('#table').DataTable({
                    columns: [
                        { data: 'title', title: 'Name' },
                        { data: 'description', title: 'Description' },
                        { data: 'skills', title: 'Skills' },
                        { data: 'dateCreated', title: 'Date Created', render: function ( data, type, row, meta ) {
                            return moment(data).fromNow();
                        }},
                        { data: 'dateUpdated', title: 'Date Updated', render: function ( data, type, row, meta ) {
                            return moment(data).fromNow();
                        }}
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
                    if (!table.row('.selected').data()) {
                        swalInfo('Select a row to delete it.');
                        return;
                    }

                    swalDeleteForm(() => {
                        const id = table.row('.selected').data()._id;
                        jobService.delete(id).then(function (result) {
                            if (result.error) {
                                swalError(result.error);
                                return;
                            }
    
                            swalSuccess('Job deleted successfully!');
                            table.row('.selected').remove().draw(false);
                        });
                    });
                });

                $('#btn-edit').click(function () {
                    if (!table.row('.selected').data()) {
                        swalInfo('Select a row to edit it.');
                        return;
                    }
                    const data = table.row('.selected').data();
                    swalForm(data.title, data.description, data.skills, values => {
                        values =  {
                            ...values,
                            dateUpdated: moment().format()
                        };
                        jobService.update(data._id, values).then(result => {
                            if (result.error) {
                                swalError(result.error);
                                return;
                            }

                            swalSuccess('Job updated successfully!');
                            table.row('.selected').data({
                                ...values
                            });
                        });
                    });
                });
            });
    }

    return (
        <div className="container-fluid" style={{ marginTop: '30px' }}>
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <h4>Jobs</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-12 text-right">
                    <button className="btn btn-outline-primary btn-sm m-1" onClick={e => handleCreate(e)}>Create</button>
                    <button id="btn-delete" className="btn btn-outline-danger btn-sm m-1">Delete selected row</button>
                    <button id="btn-edit" className="btn btn-outline-info btn-sm m-1">Edit selected row</button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-sm-12 col-md-12">
                    <table id="table" className="table table-striped table-hover" style={{ border: '1px solid #000' }}></table>
                </div>
            </div>
        </div>
    );
}