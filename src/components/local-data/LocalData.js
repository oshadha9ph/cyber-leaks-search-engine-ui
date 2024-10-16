import React from 'react';
import LocalDataTable from './tables/LocalDataTable.js';

const LocalData = ({ localData = [] }) => {

    return (
        <LocalDataTable data={localData} />
    );
};

export default LocalData;