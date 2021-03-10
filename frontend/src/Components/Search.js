import React from 'react';
import { useDispatch } from 'react-redux';
import {filterSearchTicket} from '../Pages/redux-features/ticketListAction'

import { Form, Row, Col } from 'react-bootstrap';

function Search() {

    const dispatch = useDispatch();

    const handleOnChange = e => {
        const {  value } = e.target;
        //console.log(name, value);
        dispatch(filterSearchTicket(value));
    };
    //console.log(str);
    return (
    <Form>
        <Form.Group as={Row}>
            <Form.Label column sm="2">
                    Search 
            </Form.Label>
            <Col sm="10">
            <Form.Control
             name="search"
             onChange={handleOnChange}
             placeholder="Search..."
             //value={str}
            />
            </Col>
        </Form.Group>
    </Form>
    )
}

export default Search;