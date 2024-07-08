import { Server as HttpServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer } from 'socket.io';
import { Socket as NetSocket } from 'net';
import { ServerResponse } from 'http';

interface SocketServer extends NetSocket {
  server: HttpServer & {
    io?: IOServer;
  };
}

interface NextApiResponseWithSocket extends ServerResponse {
  socket: SocketServer;
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log('Socket.io server already running');
  } else {
    console.log('Setting up Socket.io server...');
    const httpServer: HttpServer = res.socket.server as any;
    const io = new IOServer(httpServer, {
      path: '/api/socket',
      cors: {
        origin: '*',
      },
    });

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('callUser', (data) => {
        io.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from });
      });

      socket.on('acceptCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
