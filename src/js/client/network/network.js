import io from 'socket.io';

const socketConnection = io('http://192.168.0.11:1337');

export default socketConnection;
