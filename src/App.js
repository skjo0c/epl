import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';

export default function App() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [tableData, setTableData] = useState([
    {
      name: 'Burnley FC',
      matchPlayed: 2,
      win: 1,
      draw: 0,
      loss: 1,
      goalForwarded: 4,
      goalAgainst: 2,
      goalDifference: 2,
      points: 3,
      results: ['W', 'L'],
    },
    {
      name: 'Newcastle United FC',
      matchPlayed: 2,
      win: 0,
      draw: 0,
      loss: 2,
      goalForwarded: 1,
      goalAgainst: 4,
      goalDifference: -3,
      points: 0,
      results: ['L', 'L'],
    },
    {
      name: 'Chelsea FC',
      matchPlayed: 2,
      win: 0,
      draw: 1,
      loss: 1,
      goalForwarded: 1,
      goalAgainst: 5,
      goalDifference: -4,
      points: 1,
      results: ['L', 'D'],
    },
    {
      name: 'Wolverhampton Wanderers FC',
      matchPlayed: 2,
      win: 0,
      draw: 2,
      loss: 0,
      goalForwarded: 1,
      goalAgainst: 1,
      goalDifference: 0,
      points: 2,
      results: ['D', 'D'],
    },
  ]);

  const handleTeamClick = (name) => {
    const teamData = tableData.find((data) => data.name === name);
    setModalIsOpen(!isModalOpen);
    setRowData(teamData);
  };

  const renderTableHeader = () => {
    let header = Object.keys(tableData[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderTableData = () => {
    return tableData.map((data) => {
      const {
        name,
        matchPlayed,
        win,
        draw,
        loss,
        goalForwarded,
        goalAgainst,
        goalDifference,
        points,
        results,
      } = data; //destructuring
      return (
        <tr key={name}>
          <td className="pointer" onClick={() => handleTeamClick(name)}>
            {name}
          </td>
          <td>{matchPlayed}</td>
          <td>{win}</td>
          <td>{draw}</td>
          <td>{loss}</td>
          <td>{goalForwarded}</td>
          <td>{goalAgainst}</td>
          <td>{goalDifference}</td>
          <td>{points}</td>
          <td>{results.join(' - ')}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      {isModalOpen && (
        <Modal
          data={rowData}
          onRequestClose={() => {
            setModalIsOpen(!isModalOpen);
          }}
        />
      )}

      <table className="table-data">
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}
