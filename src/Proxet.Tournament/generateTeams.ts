export interface Teams {
  team1: string[];
  team2: string[];
}

export const generateTeams = (filePath: string): Teams => {
  // Please implement your algorithm there.
  const team1: string[] = [];
  const team2: string[] = [];
  const neededVehiclesMap: number[] = [1, 1, 1, 2, 2, 2, 3, 3, 3];

  const fs = require('fs');
  const players: string[] = fs.readFileSync(filePath).toString()
      .split('\n')
      .map((item: string) => item.split('\t'));
  const sortedPlayers: string[] = players.sort((a, b) => {
    return Number(b[1]) - Number(a[1])
  });

  const team1RemainingVehicles: number[] = [...neededVehiclesMap];
  const team2RemainingVehicles: number[] = [...neededVehiclesMap];
  const pickedPlayersIndexes: number[] = [];

  while (team1RemainingVehicles.length !== 0 || team2RemainingVehicles.length !== 0) {

    const neededTeamPlayerIndex = (teamRemainingVehicles: number[]) => {
      return sortedPlayers.findIndex((player, index) => {
        const playerVehicleType = Number(player[2][0]);
        if (!pickedPlayersIndexes.includes(index)) {
          return teamRemainingVehicles.includes(playerVehicleType);
        }
      })
    };

    const selectPlayer = (team: string[], teamRemainingVehicles: number[], playerIndex: number) => {
      if (playerIndex !== -1) {
        team.push(sortedPlayers[playerIndex][0]);
        pickedPlayersIndexes.push(playerIndex);
        const indexOfAddedVehicleType = teamRemainingVehicles.indexOf(Number(sortedPlayers[playerIndex][2][0]));
        if (indexOfAddedVehicleType !== -1) {
          teamRemainingVehicles.splice(indexOfAddedVehicleType, 1);
        }
      }
    };

    selectPlayer(team1, team1RemainingVehicles,  neededTeamPlayerIndex(team1RemainingVehicles));
    selectPlayer(team2, team2RemainingVehicles,  neededTeamPlayerIndex(team2RemainingVehicles));
  }

  return {
    team1,
    team2,
  };
};