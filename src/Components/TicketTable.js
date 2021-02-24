import React from 'react';
import { Table} from 'react-bootstrap';

function TicketTable({tickets}) {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Opened Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length ?
            tickets.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.complaint}</td>
                <td>{row.status}</td>
                <td>{row.openedAt}</td>
              </tr>
            )) :
          <tr>
            <td className="text-center" colSpan="4">No tickets to display</td>
          </tr>
        }         
        </tbody>
      </Table>
    );
}

export default TicketTable;