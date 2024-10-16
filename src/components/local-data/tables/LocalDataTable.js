import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

import { PrimeReactProvider } from 'primereact/api';


import "./local-data-table.css";

const LocalDataTable = ({ data }) => {
    const tableList = data.map((x) => {
        return {
            platform: x._source.host.name,
            name: x._source.firstname + " " + x._source.lastname,
            Type: "Local",
            address: x._source.address_1,
            created: x._source["@timestamp"],
        };
    });

    const statusBodyTemplate = (data) => {
        return <Tag value={data.Type} severity={getSeverity(data.Type)}></Tag>;
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'Osint':
                return 'success';

            case 'Local':
                return 'warning';

            default:
                return null;
        }
    };

    return (
        <PrimeReactProvider>
            <div className="card mt-3">
                <DataTable value={tableList} paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="platform" header="Platform" style={{ width: '25%' }}></Column>
                    <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                    <Column body={statusBodyTemplate} header="API Origin" style={{ width: '25%' }}></Column>
                    <Column address="timestampLastSeen" header="Address" style={{ width: '25%' }}></Column>
                    <Column field="created" header="Timestamp" style={{ width: '25%' }}></Column>
                </DataTable>
            </div >
        </PrimeReactProvider>
    );
};

export default LocalDataTable;
