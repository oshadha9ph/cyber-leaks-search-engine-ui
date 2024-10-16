import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PrimeReactProvider, } from 'primereact/api';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';


import "./global-data-table.css";

const GlobalDataTable = ({ data }) => {

    const getDomainFromUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            return `${parsedUrl.protocol}//${parsedUrl.hostname}`; // This gives the domain URL, e.g., 'https://mastodon.social'
        } catch (error) {
            console.error("Invalid URL", error);
            return null;
        }
    };

    const tableList = data.map((x) => {
        return {
            platform: x.module,
            descriptionCreated: x.front_schemas?.[0]?.timeline.registered ? `Created Account (${x.front_schemas[0].module})` : "----",
            // descriptionLastSeen: x.front_schemas?.[0]?.timeline.last_seen ? `Last Active (${x.front_schemas[0].module})` : "----",
            Type: "Osint",
            timestampCreated: x.front_schemas?.[0]?.timeline.registered ? x.front_schemas[0].timeline.registered_date : "----",
            // timestampLastSeen: x.front_schemas?.[0]?.timeline.last_seen ? x.front_schemas[0].timeline.last_seen_date : "----",
            profile: x.spec_format && x.spec_format.length > 0 ? (x.spec_format[0].profile_url ? x.spec_format[0].profile_url.value : "----") : "----",
            picture: x.spec_format && x.spec_format.length > 0 ? (x.spec_format[0].picture_url ? x.spec_format[0].picture_url.value : "----") : "----",
            platformImage: `https://cdn.osint.industries/modules/${x.module}.png`,
        };
    });

    const profileeBodyTemplate = (data) => {

        if (data.profile === "----") {
            return <Button disabled={true} label="Profile Link" icon="pi pi-external-link" onClick={() => window.open(data.profile, '_blank')} />
        } else {
            return <Button label="Profile Link" icon="pi pi-external-link" onClick={() => window.open(data.profile, '_blank')} />
        }
    };

    const pictureBodyTemplate = (data) => {
        if (data.picture === "----") {
            return < Button disabled={true} label="Picture Picture" icon="pi pi-external-link" onClick={() => window.open(data.picture, '_blank')} />
        } else {
            return < Button label="Picture Picture" icon="pi pi-external-link" onClick={() => window.open(data.picture, '_blank')} />
        }
    };


    const imageBodyTemplate = (data) => {
        const defaultImagePath = "/assets/default.png"; // path relative to 'public' folder

        return (
            <img
                src={data.platformImage || defaultImagePath}
                alt="Platform"
                className="w-6rem shadow-2 border-round"
            />
        );
    };

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
                <DataTable
                    value={tableList}
                    paginator
                    rows={4}
                    responsiveLayout="scroll"  // Enables responsive behavior
                    tableStyle={{ minWidth: '50rem' }} // Base min-width for larger screens
                >
                    <Column body={imageBodyTemplate} header="" style={{ minWidth: '30%' }}></Column>
                    <Column field="platform" header="Platform" style={{ width: '25%' }}></Column>
                    <Column body={profileeBodyTemplate} header="Profile" style={{ maxWidth: '5%' }}></Column>
                    <Column body={pictureBodyTemplate} header="Picture" style={{ maxWidth: '5%' }}></Column>
                    <Column body={statusBodyTemplate} header="API Origin" style={{ maxWidth: '10%' }}></Column>
                    <Column field="descriptionCreated" header="Description" style={{ width: '25%' }}></Column>
                    <Column field="descriptionCreated" header="Timestamp" style={{ width: '7%', maxWidth: '10%' }}></Column>
                </DataTable>
            </div>
        </PrimeReactProvider>
    );
};

export default GlobalDataTable;
