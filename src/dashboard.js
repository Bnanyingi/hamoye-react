import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const [flightsData, setFlightsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage, setFlightsPerPage] = useState(10);
  const options = { timeZone: "America/Chicago", hour12: true };

  useEffect(() => {
    fetch(
      "https://opensky-network.org/api/flights/all?begin=1517227200&end=1517230800"
    )
      .then((response) => response.json())
      .then((data) => {
        setFlightsData(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  //   const handlePageChange = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };

  const handleFlightsPerPageChange = (e) => {
    setFlightsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flightsData.slice(indexOfFirstFlight, indexOfLastFlight);
  
  const flights = currentFlights.slice(0, 100).map((flight, index) => ({
    id: flight.icao24 + "_" + index,
    flightNumber: flight.icao24,
    airport: flight.estDepartureAirport,
    time: new Date(flight.firstSeen).toLocaleTimeString("en-US", options),
    arriving: flight.arrivalAirportCandidatesCount,
    departing: flight.departureAirportCandidatesCount,
  }));

  const navigate = useNavigate();

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(flightsData.length / flightsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h2>Flight Details</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Airport</th>
              <th>Time</th>
              <th>Arriving</th>
              <th>Departing</th>
            </tr>
          </thead>
          <tbody>
            {flights.length > 0 &&
              flights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.airport}</td>
                  <td>{flight.time}</td>
                  <td>{flight.arriving}</td>
                  <td>{flight.departing}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        Show{" "}
        <select value={flightsPerPage} onChange={handleFlightsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>{" "}
        <div>
          Page {currentPage} of {Math.ceil(flightsData.length / flightsPerPage)}
        </div>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(flightsData.length / flightsPerPage)
          }
        >
          Next
        </button>
      </div>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
