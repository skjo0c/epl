import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { getEplData } from './dashboard-actions';

import Modal from './Modal';
import './App.css';
import { makeSelectEplData } from './dashboard-selector';
import { formattedTable } from './utils/formatEplTable';

const App = ({ fetchEplData, eplData }) => {
  const [listYear, setListYear] = useState([
    '2019-20',
    '2018-19',
    '2017-18',
    '2016-17',
    '2015-16',
  ]);
  const [year, setYear] = useState('2019-20');
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState();
  const [tableData, setTableData] = useState([
    {
      name: '',
      matchPlayed: 0,
      win: 0,
      draw: 0,
      loss: 0,
      goalForwarded: 0,
      goalAgainst: 0,
      goalDifference: 0,
      points: 0,
      results: [],
    },
  ]);

  useEffect(() => {
    fetchEplData(year);
  }, [year]);

  useEffect(() => {
    async function fetchData() {
      const val = await formattedTable(eplData);

      setTableData(val);
      setSearchData();
    }
    eplData.length && fetchData();
  }, [eplData, eplData.length]);

  useEffect(() => {
    const data = [...tableData];

    const filtered = data.filter(({ name }) =>
      new RegExp(searchTerm.toLowerCase()).test(name.toLowerCase())
    );

    setSearchData(filtered);
  }, [searchTerm]);

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

  const handleSearchChange = ({ target }) => {
    setSearchTerm(target.value);
  };

  const handleYearChange = ({ target }) => {
    setYear(target.value);
  };

  const renderTableData = () => {
    return (searchData || tableData).map((data) => {
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
        gameResults,
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
          <td>{gameResults && gameResults.slice(0, 4).join(' - ')}</td>
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

      <label>Choose Year:</label>
      <select name="years" id="years" onChange={handleYearChange}>
        {listYear.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>

      <input id="search-field" type="text" onChange={handleSearchChange} />

      <table className="table-data">
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  eplData: makeSelectEplData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchEplData: (year) => dispatch(getEplData(year)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
