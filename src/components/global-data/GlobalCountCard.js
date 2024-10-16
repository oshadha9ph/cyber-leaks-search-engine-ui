import React from 'react';
// import Card from 'react-bootstrap/Card';
import './global-count-card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faUsers, faUserCheck, faBookmark } from '@fortawesome/free-solid-svg-icons';



const GlobalCountCard = ({ data }) => {
    console.log(data.length)
    const propertyCounter = (schemas, proprty) => {
        return schemas.reduce((count, schema) => {
            // Check if the object has a 'name' property
            if (schema.hasOwnProperty(proprty)) {
                return count + 1;
            }
            return count;
        }, 0);
    };

    // Function to count usernames across multiple records
    const secondLayerPropertyCounter = (records, mainProprty, property) => {
        return records.reduce((totalCount, record) => {
            if (!record[mainProprty] || !Array.isArray(record[mainProprty])) {
                return totalCount; // Skip if spec_format is not available
            }

            // Count usernames in each record
            const countInRecord = record[mainProprty].reduce((count, schema) => {
                if (schema[property] && schema[property].value) {
                    return count + 1; // Increment count if username exists
                }
                return count; // Return the current count
            }, 0);

            return totalCount + countInRecord; // Add to total count
        }, 0);
    };



    const sourceList = propertyCounter(data, "module");
    const userNameList = secondLayerPropertyCounter(data, "spec_format", "username")
    const nameList = secondLayerPropertyCounter(data, "spec_format", "name");
    const accountList = secondLayerPropertyCounter(data, "spec_format", "profile_url");
    // const countryList = secondLayerPropertyCounter(data, "spec_format", "location");

    console.log("sourceList count ", sourceList)
    console.log("userNameList count ", userNameList)
    console.log("nameList count ", nameList)
    console.log("accountList count ", accountList)
    // console.log("countryList count ", countryList)



    // const sourceList = propertyCounter(data, "module");
    // const userNameList = secondLayerPropertyCounter(data, "spec_format", "username")
    // const nameList = secondLayerPropertyCounter(data, "spec_format", "name");
    // const accountList = secondLayerPropertyCounter(data, "spec_format", "profile_url");
    // const countryList = secondLayerPropertyCounter(data, "spec_format", "location");

    return (
        <>
            {/* <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{cardContext.cardName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{cardContext.iconName}</Card.Subtitle>
                    <Card.Text>
                        {cardContext.count}
                    </Card.Text>
                </Card.Body>
            </Card> */}

            {/* <div className="container"> */}
                <div className="row card-main">
                    <div className="col-xl-3 col-lg-3">
                        <div className="card l-bg-cherry">
                            <div className="card-statistic-3 p-4">
                                <div className="card-icon card-icon-large"><i className="fas fa-shopping-cart"></i></div>
                                <div className="mb-4">
                                    <h5 className="card-title mb-0">Platforms</h5>
                                </div>
                                <div className="row align-items-center mb-2 d-flex">
                                    <div className="col-4 text-right">
                                        {/* <span>12.5% <i className="fa fa-arrow-up"></i></span> */}
                                        <FontAwesomeIcon icon={faDatabase} />
                                    </div>
                                    <div className="col-8">
                                        <h2 className="d-flex align-items-center mb-0">{sourceList}</h2>
                                    </div>
                                </div>
                                {/* <div className="progress mt-1" style={{ height: '8px' }}>
                                    <div className="progress-bar l-bg-cyan" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3">
                        <div className="card l-bg-blue-dark">
                            <div className="card-statistic-3 p-4">
                                <div className="card-icon card-icon-large"><i className="fas fa-users"></i></div>
                                <div className="mb-4">
                                    <h5 className="card-title mb-0">UserNames</h5>
                                </div>
                                <div className="row align-items-center mb-2 d-flex">
                                    <div className="col-4 text-right">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>
                                    <div className="col-8">
                                        <h2 className="d-flex align-items-center mb-0">{ userNameList }</h2>
                                    </div>
                                </div>
                                {/* <div className="progress mt-1" style={{ height: '8px' }}>
                                    <div className="progress-bar l-bg-green" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3">
                        <div className="card {colorClassName} l-bg-green-dark">
                            <div className="card-statistic-3 p-4">
                                <div className="card-icon card-icon-large"><i className="fas fa-ticket-alt"></i></div>
                                <div className="mb-4">
                                    <h5 className="card-title mb-0">Accounts</h5>
                                </div>
                                <div className="row align-items-center mb-2 d-flex">
                                    <div className="col-4 text-right">
                                    <FontAwesomeIcon icon={faBookmark} />
                                    </div>
                                    <div className="col-8">
                                        <h2 className="d-flex align-items-center mb-0">{accountList}</h2>
                                    </div>
                                </div>
                                {/* <div className="progress mt-1" style={{ height: '8px' }}>
                                    <div className="progress-bar l-bg-orange" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3">
                        <div className="card {{colorClassName}">
                            <div className="card-statistic-3 p-4">
                                <div className="card-icon card-icon-large"><i className="fas fa-dollar-sign"></i></div>
                                <div className="mb-4">
                                    <h5 className="card-title mb-0">Names</h5>
                                </div>
                                <div className="row align-items-center mb-2 d-flex">
                                    <div className="col-4 text-right">
                                        {/* <span>2.5% <i className="fa fa-arrow-up"></i></span> */}
                                        <FontAwesomeIcon icon={faUserCheck} />
                                    </div>
                                    <div className="col-8">
                                        <h2 className="d-flex align-items-center mb-0">{nameList}</h2>
                                    </div>
                                </div>
                                {/* <div className="progress mt-1" style={{ height: '8px' }}>
                                    <div className="progress-bar l-bg-cyan" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    );
};
export default GlobalCountCard;