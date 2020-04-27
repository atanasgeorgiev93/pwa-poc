import React, { useEffect, useState, useContext } from 'react';
import { GlueContext, useGlue } from "@glue42/react-hooks";
import { registerSetClientMethod, openStockDetails } from './glue';
import { REQUEST_OPTIONS } from './constants';

function Stocks() {
    const [portfolio, setPortfolio,] = useState([]);
    const [{ clientId, clientName }, setClient] = useState({});
    const onClick = useGlue(openStockDetails);

    const glue = useContext(GlueContext);
    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const url = 'http://localhost:8080' + (clientId ? `/api/portfolio/${clientId}` : "/api/portfolio");
                const response = await fetch(url, REQUEST_OPTIONS);
                const portfolio = await response.json();
                setPortfolio(portfolio);
            } catch (e) {
                console.log(e);
            }
        };
        fetchPortfolio();
    }, [clientId]);
    const showStockDetails = stock => {
        sessionStorage.setItem('stock', JSON.stringify(stock));
        window.location.href = `http://${window.location.host}/details`;
    };

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
                <div className="col-md-8">
                    <h1 id="title" className="text-center">
                        Stocks
                    </h1>
                </div>
            </div>
            <div className="row">
                {
                    clientId && (
                        <h2 className="p-3">
                            Client {clientName} - {clientId}
                        </h2>
                    )
                }
                <div className="col-md-12">
                    <table id="portfolioTable" className="table table-hover">
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Description</th>
                                <th className="text-right">Bid</th>
                                <th className="text-right">Ask</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.map(({ RIC, Description, Bid, Ask, ...rest }) => (
                                <tr
                                    key={RIC}
                                    onClick={() => onClick({ ...rest, RIC, Description })} key={RIC}
                                >
                                    <td>{RIC}</td>
                                    <td>{Description}</td>
                                    <td className="text-right">{Bid}</td>
                                    <td className="text-right">{Ask}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Stocks;
