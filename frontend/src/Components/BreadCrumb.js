import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function BreadCrumb({page}) {
    return (
      <Breadcrumb className="breadcrumb col-6">
        <LinkContainer to="/dashboard">
          <Breadcrumb.Item >Home</Breadcrumb.Item>
        </LinkContainer>
       
        <Breadcrumb.Item active>{page}</Breadcrumb.Item>
      </Breadcrumb>
    );
}

export default BreadCrumb;