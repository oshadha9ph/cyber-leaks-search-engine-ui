import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const SearchResults = ({ results, isLocal }) => {
    console.log("result ", results)
    const newResults = [];

    if (isLocal) {
        results.results.forEach(result => {
            const obj = {
                host: result._source.host.name,
                name: result._source.firstname + " " + result._source.lastname,
                address: result._source.address_1,
                company: result._source.company,
                created: result._source["@timestamp"],
            }
            newResults.push(obj);
        });
    } else {
        const newLocal = [];
        const newGlobal = [];
        results.global.forEach(result => {
            const obj = {
                host: result.module,
                name: result.spec_format[0].name ? result.spec_format[0].name.value : "",
                profile: result.spec_format[0].profile_url ? result.spec_format[0].profile_url.value : "",
                picture: result.spec_format[0].picture_url ? result.spec_format[0].picture_url.value : "",
                created: result.spec_format[0].creation_date ? result.spec_format[0].creation_date.value : "",
                isGlobal: true
            }
            newLocal.push(obj);
        });
        results.local.results.forEach(result => {
            const obj = {
                host: result._source.host.name,
                name: result._source.firstname + " " + result._source.lastname,
                address: result._source.address_1,
                company: result._source.company,
                created: result._source["@timestamp"],
                isGlobal: false
            }
            newGlobal.push(obj);
        });

        newResults.push(...newLocal, ...newGlobal);
    }


    return (
        <div className="container mt-5 overflow-auto h-auto d-inline">
            <Row>
                {newResults.map((result, index) => (
                    <Col md={4} className="mb-4" key={index}>
                        <Card border="primary" style={{ width: '100%' }}>
                            {isLocal && (
                                <>
                                    <Card.Header>
                                        Created: {result.created || 'Creation date not found'}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title style={{ textTransform: 'uppercase' }}>{result.host || 'Host not found'}</Card.Title>
                                        <Card.Text>
                                            <p><strong>Name:</strong> {result.name || 'Name not found'}</p>
                                            <p><strong>Address:</strong> {result.address || 'Address not found'}</p>
                                            <p><strong>Company:</strong> {result.company || 'Company not found'}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </>
                            )}
                            {!isLocal && !result.isGlobal && (
                                <>
                                    <Card.Header>
                                        Created: {result.created || 'Creation date not found'}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title style={{ textTransform: 'uppercase' }}>{result.host || 'Host not found'}</Card.Title>
                                        <Card.Text>
                                            <p><strong>Name:</strong> {result.name || 'Name not found'}</p>
                                            <p><strong>Address:</strong> {result.address || 'Address not found'}</p>
                                            <p><strong>Company:</strong> {result.company || 'Company not found'}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </>
                            )}
                            {result.isGlobal && (
                                <>
                                    <Card.Header>
                                        Created: {result.created || 'Creation date not found'}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title style={{ textTransform: 'uppercase' }}>{result.host || 'Host not found'}</Card.Title>
                                        <Card.Text>
                                            <p><strong>Name:</strong> {result.name || 'Name not found'}</p>
                                            <p>
                                                <strong>Profile:</strong>
                                                <a href={result.profile || '#'} target="_blank" rel="noopener noreferrer">
                                                    {result.profile ? ' View Profile' : ' Profile not found'}
                                                </a>
                                            </p>
                                            <p>
                                                <strong>Picture:</strong>
                                                <a href={result.picture || '#'} target="_blank" rel="noopener noreferrer">
                                                    {result.picture ? ' View Picture' : ' Picture not found'}
                                                </a>
                                            </p>
                                        </Card.Text>
                                    </Card.Body>
                                </>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default SearchResults;
