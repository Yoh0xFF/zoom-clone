import { v4 as uuid } from 'uuid';
import { User } from '../models/user';
import { connectedUsers, rooms } from '../dummy-data';
import { Room } from '../models/room';
import { Server, Socket } from 'socket.io';
import { ClientToServerEvent, ServerToClientEvent } from '../models/wss';

export function createNewRoomHandler(
  socket: Socket<ClientToServerEvent, ServerToClientEvent>,
  data: { identity: string }
) {
  const { identity } = data;
  const roomId = uuid();

  // Create new user
  const newUser: User = {
    id: uuid(),
    socketId: socket.id,
    identity: identity,
    roomId: roomId,
  };
  connectedUsers.push(newUser);

  // Create new room
  const newRoom: Room = {
    id: roomId,
    connectedUsers: [newUser],
  };
  rooms.push(newRoom);

  socket.join(roomId);

  // emit room id to the creator
  socket.emit('newRoomCreated', { roomId });

  // emit new user join event to the connected users in the room
  socket.emit('roomUpdated', { connectedUsers: newRoom.connectedUsers });
}

export function joinRoomHandler(
  server: Server<ClientToServerEvent, ServerToClientEvent>,
  socket: Socket<ClientToServerEvent, ServerToClientEvent>,
  data: { identity: string; roomId: string }
) {
  const { identity, roomId } = data;

  // Create new user
  const newUser: User = {
    id: uuid(),
    socketId: socket.id,
    identity: identity,
    roomId: roomId,
  };

  // Find and join the room
  const room = rooms.find((x) => x.id === roomId);
  if (!room) {
    return;
  }
  room.connectedUsers.push(newUser);
  connectedUsers.push(newUser);

  socket.join(roomId);

  // emit new user join event to the connected users in the room
  server
    .to(roomId)
    .emit('roomUpdated', { connectedUsers: room.connectedUsers });
}