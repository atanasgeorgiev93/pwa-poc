import React, { useEffect, useState, useContext } from 'react';
import { GlueContext, useGlue } from "@glue42/react-hooks";
import { setClientPortfolioInterop } from "./glue";
import { REQUEST_OPTIONS } from './constants';

function Clients() {
  const [clients, setClients] = useState([]);
  const glue = useContext(GlueContext);
  const onClick = useGlue(setClientPortfolioInterop);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/clients', REQUEST_OPTIONS);
        const clients = await response.json();
        setClients(clients);
      } catch (e) {
        console.log(e);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {!glue && (
            <span id="glueSpan" className="badge badge-warning">
              Glue is unavailable
            </span>
          )}
          {glue && (
            <span id="glueSpan" className="badge badge-success">
              Glue is available
            </span>
          )}
        </div>
        <div className="col-md-10">
          <h1 className="text-center">Clients</h1>
        </div>
      </div>
      <div className="row">
        <table id="clientsTable" className="table table-hover">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>PID</th>
              <th>GID</th>
              <th>Account Manager</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(({ name, pId, gId, accountManager, portfolio }) => (
              <tr
                key={pId}
                onClick={() => onClick({ clientId: gId, clientName: name, portfolio })}
              >
                <td>{name}</td>
                <td>{pId}</td>
                <td>{gId}</td>
                <td>{accountManager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clients;
