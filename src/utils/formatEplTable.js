const defaultValues = {
  name: '',
  matchPlayed: 0,
  win: 0,
  draw: 0,
  loss: 0,
  goalForwarded: 0,
  goalAgainst: 0,
  goalDifference: 0,
  points: 0,
  gameResults: [],
};

export const formattedTable = (results) => {
  const tableFormat = results.reduce((tableArray, currentVal) => {
    for (let match of currentVal.matches) {
      const { team1, team2, score } = match;

      // If the length doesn't already exist as a key in the object, create it
      let prevTeam1Detail = tableArray.find((team) => team.name === team1);
      let prevTeam2Detail = tableArray.find((team) => team.name === team2);

      if (!prevTeam1Detail) prevTeam1Detail = { ...defaultValues, name: team1 };
      if (!prevTeam2Detail) prevTeam2Detail = { ...defaultValues, name: team2 };

      const team1Index = tableArray.findIndex((team) => team.name === team1);
      const team2Index = tableArray.findIndex((team) => team.name === team2);

      if (typeof score === 'undefined') {
        if (team1Index === -1) {
          tableArray.push(prevTeam1Detail);
        } else {
          tableArray[team1Index] = prevTeam1Detail;
        }

        if (team2Index === -1) {
          tableArray.push(prevTeam2Detail);
        } else {
          tableArray[team2Index] = prevTeam2Detail;
        }
        return tableArray;
      }

      const scoreOfTeam1 = match.score.ft[0];
      const scoreOfTeam2 = match.score.ft[1];

      const goalDiffTeam1 =
        prevTeam1Detail.goalDifference + scoreOfTeam1 - scoreOfTeam2;
      const goalDiffTeam2 =
        prevTeam2Detail.goalDifference + scoreOfTeam2 - scoreOfTeam1;
      let team1Points = prevTeam1Detail.points;
      let team2Points = prevTeam2Detail.points;
      let winner = '';

      if (scoreOfTeam1 > scoreOfTeam2) {
        team1Points = 3;
        team2Points = 0;
        winner = 'team1';
      } else if (scoreOfTeam1 < scoreOfTeam2) {
        team1Points = 0;
        team2Points = 3;
        winner = 'team2';
      } else {
        team1Points = 1;
        team2Points = 1;
      }

      const updatedTeam1Value = {
        ...prevTeam1Detail,
        name: team1,
        matchPlayed: prevTeam1Detail.matchPlayed + 1,
        win:
          scoreOfTeam1 > scoreOfTeam2
            ? prevTeam1Detail.win + 1
            : prevTeam1Detail.win,
        draw:
          scoreOfTeam1 === scoreOfTeam2
            ? prevTeam1Detail.draw + 1
            : prevTeam1Detail.draw,
        loss:
          scoreOfTeam1 < scoreOfTeam2
            ? prevTeam1Detail.loss + 1
            : prevTeam1Detail.loss,
        goalForwarded: prevTeam1Detail.goalForwarded + scoreOfTeam1,
        goalAgainst: prevTeam1Detail.goalAgainst + scoreOfTeam2,
        goalDifference: goalDiffTeam1,
        points: prevTeam1Detail.points + team1Points,
        gameResults: [
          ...prevTeam1Detail.gameResults,
          winner === '' ? 'D' : winner === 'team1' ? 'W' : 'L',
        ],
      };

      const updatedTeam2Value = {
        ...prevTeam2Detail,
        name: team2,
        matchPlayed: prevTeam2Detail.matchPlayed + 1,
        win:
          scoreOfTeam2 > scoreOfTeam1
            ? prevTeam2Detail.win + 1
            : prevTeam2Detail.win,
        draw:
          scoreOfTeam2 === scoreOfTeam1
            ? prevTeam2Detail.draw + 1
            : prevTeam2Detail.draw,
        loss:
          scoreOfTeam2 < scoreOfTeam1
            ? prevTeam2Detail.loss + 1
            : prevTeam2Detail.loss,
        goalForwarded: prevTeam2Detail.goalForwarded + scoreOfTeam2,
        goalAgainst: prevTeam2Detail.goalAgainst + scoreOfTeam1,
        goalDifference: goalDiffTeam2,
        points: prevTeam2Detail.points + team2Points,
        gameResults: [
          ...prevTeam2Detail.gameResults,
          winner === '' ? 'D' : winner === 'team2' ? 'W' : 'L',
        ],
      };

      if (team1Index === -1) {
        tableArray.push(updatedTeam1Value);
      } else {
        tableArray[team1Index] = updatedTeam1Value;
      }

      if (team2Index === -1) {
        tableArray.push(updatedTeam2Value);
      } else {
        tableArray[team2Index] = updatedTeam2Value;
      }
    }
    return tableArray;
  }, []);

  console.log(tableFormat, 'tableFormat');
  return tableFormat;
};
