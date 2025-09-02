import { io } from 'socket.io-client';

const URL = 'http://172.252.13.83:8002/';

export const socket = io(URL);
