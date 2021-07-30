import React, { useState, useEffect } from 'react';
import jobService from "../services/job";
import { swalError, swalSuccess, swalInfo, swalForm, swalDeleteForm } from "../utils/swal";
import $ from 'jquery';
import dt from 'datatables.net';
import moment from 'moment';

export default function Users(props) {

    // loading jobs on component load
    useEffect(() => {
        (async () => reload())();
    }, []);

    // handle create button click event 
    const handleCreate = e => {
        e.preventDefault();

        // show new job model and get values put by user
        swalForm('', '', '', async val => {
            // add current datetime along other properties
            let data = {
                ...val,
                dateCreated: moment().format(),
                dateUpdated: moment().format()
            };
            // use our service method to send API call to create new job
            await jobService.add(data)
                .then(result => {
                    // in case of any error, alert it to user
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    // otherwise,
                    // job is added successfully
                    swalSuccess('Job added successfully!');
                    destroy();
                    // reload data in datatable
                    reload();
                });
        });
    }

    // we need this method to re-render the Datatables.net table
    const destroy = () => {
        const table = $('#table').DataTable();
        table.destroy();
    }

    // calling our API service and get all jobs
    const reload = async () => {
        await jobService.getAll()
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                const data = result.data;
                // render jobs using DataTable from datatables.net liberary
                // set its columns and data
                // also specify the render method to manipulate the rendering
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

                // to show a row as selected when user clicks on it
                $('#table tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                // delete a row
                $('#btn-delete').click(function () {
                    // if no row selected, then alert user to select first
                    if (!table.row('.selected').data()) {
                        swalInfo('Select a row to delete it.');
                        return;
                    }

                    // ask for confirmation from user
                    swalDeleteForm(() => {
                        // if confirms
                        // get the ID for selected row
                        const id = table.row('.selected').data()._id;
                        // call our API service to delete the row
                        jobService.delete(id).then(function (result) {
                            if (result.error) {
                                swalError(result.error);
                                return;
                            }
    
                            // success alert
                            swalSuccess('Job deleted successfully!');
                            // remove row from UI
                            table.row('.selected').remove().draw(false);
                        });
                    });
                });

                // edit a job
                $('#btn-edit').click(function () {
                    // if no row selected, then alert user to select first
                    if (!table.row('.selected').data()) {
                        swalInfo('Select a row to edit it.');
                        return;
                    }

                    const data = table.row('.selected').data();
                    // show model with current jobs data
                    swalForm(data.title, data.description, data.skills, values => {
                        // get updated values 
                        // add updated time
                        values =  {
                            ...values,
                            dateUpdated: moment().format()
                        };

                        // call our API service to update a job
                        jobService.update(data._id, values).then(result => {
                            if (result.error) {
                                swalError(result.error);
                                return;
                            }

                            // success alert
                            swalSuccess('Job updated successfully!');
                            // update on UI
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
                    <h4>Jobs Listing Portal</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-12 text-right">
                    <button className="btn btn-outline-primary m-1" onClick={e => handleCreate(e)}>Create</button>
                    <button id="btn-delete" className="btn btn-outline-danger m-1">Delete selected row</button>
                    <button id="btn-edit" className="btn btn-outline-info m-1">Edit selected row</button>
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