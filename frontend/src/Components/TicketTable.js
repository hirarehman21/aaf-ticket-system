import React from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TicketTable() {
  
  //const { tickets, isLoading, error } = useSelector((state) => state.tickets);
  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );
    console.log("searchtickets", searchTicketList);
  if (isLoading) return <h3>Loading...</h3>
  
  if (error) return <h3>error</h3>
  
    return (
      <Table hover className="mb-5">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Opened Date</th>
          </tr>
        </thead>
        <tbody>
          {searchTicketList.length ? (
            searchTicketList.map((row) => (
              <tr key={row._id}>
                <td>{row._id}</td>
                <td>
                  <Link to={`/ticket/${row._id}`}>{row.complaint}</Link>
                </td>
                <td>{row.status}</td>
                <td>{row.openedAt && new Date(row.openedAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="4">
                No tickets to display
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
}

export default TicketTable;