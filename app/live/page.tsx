"use client";

import { FC, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io("http://localhost:3000"); 

const Broadcast: FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const startBroadcast = () => {
    setIsLive(true);
    socket.emit("start-broadcast", { message: "live started" });
  };

  const stopBroadcast = () => {
    setIsLive(false);
    socket.emit("stop-broadcast", { message: "live stopped" });
  };

  useEffect(() => {
    socket.on('broadcast-message', (data: { message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      socket.off('broadcast-message');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Broadcast</h1>
      <div>
        {isLive ? (
          <div>
            <p className="text-xl">You are now live!</p>
            <button onClick={stopBroadcast} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              Stop Broadcast
            </button>
          </div>
        ) : (
          <button onClick={startBroadcast} className="px-4 py-2 bg-green-500 text-white rounded">
            Start Broadcast
          </button>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Messages</h2>
        <ul className="list-disc list-inside">
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Broadcast;
