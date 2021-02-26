import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

function BreadCrumb({page}) {
    return (
      <Breadcrumb className="breadcrumb col-6">
        <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{page}</Breadcrumb.Item>
      </Breadcrumb>
    );
}

export default BreadCrumb;