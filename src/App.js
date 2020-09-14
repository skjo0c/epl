import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { getEplData } from './dashboard-actions';

import Modal from './Modal';
import './App.css';
import {
  makeSelectEplData,
  makeSelectEplDataLoading,
} from './dashboard-selector';
import { formattedTable } from './utils/formatEplTable';
import { ascending, descending } from './utils/sortArray';

const App = ({ fetchEplData, eplDataLoading, eplData }) => {
  const [listYear] = useState([
    '2019-20',
    '2018-19',
    '2017-18',
    '2016-17',
    '2015-16',
  ]);
  const [year, setYear] = useState('2019-20');
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [sortBy, setSortBy] = useState('descending');
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
    const fetchData = async () => {
      const val = await formattedTable(eplData);

      setTableData(val);
      setSearchData();
    };
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

  const handleSortByPoint = () => {
    let sortedTable;
    if (sortBy === 'descending') {
      sortedTable = ascending(tableData, 'points', 'goalDifference');
      setSortBy('ascending');
    } else {
      sortedTable = descending(tableData, 'points', 'goalDifference');
      setSortBy('descending');
    }
    setTableData(sortedTable);
    setSearchData(sortedTable);
  };

  const renderTableHeader = () => {
    return (
      <>
        <th>Name</th>
        <th>MP</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>GF</th>
        <th>GA</th>
        <th>GD</th>
        <th onClick={handleSortByPoint} className="pointer">
          Points
          <i className="fa fa-sort" style={{ float: 'right' }}></i>
        </th>
        <th>Last 5</th>
      </>
    );
  };

  const handleSearchChange = ({ target }) => {
    setSearchTerm(target.value);
  };

  const handleYearChange = ({ target }) => {
    setYear(target.value);
  };

  const highLightRow = (rank) => {
    if (rank < 5) return 'top-4';
    if (rank > 17) return 'bottom-3';
  };

  const renderTableData = () => {
    return (searchData || tableData).map((data) => {
      const {
        rank,
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
        <tr key={name} className={highLightRow(rank)}>
          <td className="pointer" onClick={() => handleTeamClick(name)}>
            <span className="club-ranks">{rank}</span>
            <span className="club-logos">
              <img src={`../assets/${name}.png`} height="20" width="20" />
            </span>
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
          onRequestClose={() => {
            setModalIsOpen(!isModalOpen);
          }}
        >
          <div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <img
                  src={`../assets/${rowData.name}.png`}
                  height="160"
                  width="160"
                />
              </div>

              <div>
                <p className="modal__title">Team Name: {rowData.name} </p>
                <p className="modal__title">Team Position: {rowData.rank}</p>
                <p className="modal__title">
                  Last 5 results:{' '}
                  {rowData.gameResults &&
                    rowData.gameResults.slice(0, 4).join(' - ')}
                </p>
              </div>
            </div>

            <div className="game-detail">
              <div>
                <div className="modal__title">Total Wins: </div>
                <div>{rowData.win}</div>
              </div>
              <div>
                <div className="modal__title">Total Draws: </div>
                <div>{rowData.draw}</div>
              </div>
              <div>
                <div className="modal__title">Total Loss: </div>
                <div>{rowData.loss}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <div>
        <div className="select-field">
          <label>Choose Year:</label>
          <select name="years" id="years" onChange={handleYearChange}>
            {listYear.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        <div className="search">
          <span className="fa fa-search"></span>
          <input id="search-field" type="text" onChange={handleSearchChange} />
        </div>
      </div>

      {eplDataLoading ? (
        <div className="loader">'Loading...'</div>
      ) : (
        <table className="table-data">
          <tbody>
            <tr>{renderTableHeader()}</tr>

            {renderTableData()}
          </tbody>
        </table>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  eplData: makeSelectEplData(),
  eplDataLoading: makeSelectEplDataLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchEplData: (year) => dispatch(getEplData(year)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
