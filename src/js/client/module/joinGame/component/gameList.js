import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { maxPlayers } from '../../../../configuration/game';

const GamesList = ({ games, joinGame }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Players</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map(game => (
          <TableRow key={game.id} onClick={() => joinGame(game.id)}>
            <TableCell component="th" scope="row">
              {game.name}
            </TableCell>
            <TableCell>{`${game.nbPlayers} / ${maxPlayers}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default GamesList;
