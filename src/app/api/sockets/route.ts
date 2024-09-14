import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { Socket } from 'net';

export const dynamic = 'force-dynamic';

interface NextApiResponseServerIO extends NextApiResponse {
  socket: Socket & {
    server: any;
  };
}

export async function GET(req: NextRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new SocketIOServer(res.socket.server as any);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.emit('me', socket.id);

      socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
      });

      socket.on('callUser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('callUser', { signal: signalData, from, name });
      });

      socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
      });
    });
  }

  return new Response('Socket is running', {
    status: 200,
  });
}