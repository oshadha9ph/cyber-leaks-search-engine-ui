import React, { useState } from 'react';
import GlobalDataTable from './tables/GlobalDataTable.js';
//bootstrap
import LocalDataTable from '../local-data/tables/LocalDataTable.js';
import Tabs from 'react-bootstrap/Tabs';

const GlobalData = ({ globalData = [] }) => {
    const [isGlobal, setIsGlobal] = useState(true);



    return (
        <>
            {/* Button to toggle isGlobal status */}
            {/* Osint button */}
            <div className="flex justify-center items-center space-x-4 mt-2">
                {/* Osint button */}
                <div className="relative">
                    <button
                        className="bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring overflow-hidden"
                        onClick={() => setIsGlobal(true)}
                        style={{ position: "relative", zIndex: 2, color: "#00ff00" }}
                    >
                        Osint Data
                    </button>
                </div>

                {/* Local button */}
                <div className="relative">
                    <button
                        className="bg-blue-900 text-neon-green px-8 py-3 rounded-lg shadow-lg focus:outline-none focus:ring overflow-hidden"
                        onClick={() => setIsGlobal(false)}
                        style={{ position: "relative", zIndex: 2, color: "#00ff00" }}
                    >
                        Local Data
                    </button>
                </div>
            </div>

            {/* 
            {isGlobal ? (
                <div>
                    <GlobalDataTable data={globalData} />
                </div>
            ) : (
                <div>
                    <LocalDataTable data={globalData.local} />
                </div>
            )} */}

            {isGlobal ? (
                globalData.osint && globalData.osint.length > 0 && (
                    <div>
                        <GlobalDataTable data={globalData.osint} />
                    </div>
                )
            ) : (
                globalData.local && globalData.local.length > 0 && (
                    <div>
                        <LocalDataTable data={globalData.local} />
                    </div>
                )
            )}
        </>
    );
};

export default GlobalData;


// import React, { useState } from 'react';
// import GlobalDataTable from './tables/GlobalDataTable.js';
// //bootstrap
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// // css
// import "./global-data.css";


// const GlobalData = ({ globalData }) => {
//     // const data = globaData;

//     return (
//         <div className='main-tab'>
//             {/* Tabs with content */}
//             <Tabs
//                 defaultActiveKey="profile"
//                 id="justify-tab-example"
//                 className="mb-3"
//                 justify
//             >
//                 <Tab eventKey="home" title="Home">
//                     <div className='tab-content'>
//                         <GlobalDataTable data={globalData} /></div>
//                 </Tab>
//                 <Tab eventKey="profile" title="Profile">
//                     <div className='tab-content'><GlobalDataTable data={globalData} /></div>
//                 </Tab>
//             </Tabs>
//             {/* // < GlobalDataTable data={globalData} /> */}
//         </div>
//     );
// };

// export default GlobalData;
