import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function Search(str) {
    return (
    <Form>
        <Form.Group as={Row}>
            <Form.Label column sm="2">
                    Search 
            </Form.Label>
            <Col sm="10">
            <Form.Control
             name="search"
             placeholder="Search..."
             value={str}
            />
            </Col>
        </Form.Group>
    </Form>
    )
}

export default Search;