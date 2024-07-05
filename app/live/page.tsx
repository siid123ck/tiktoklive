"use client"
import { FC, useState } from 'react';

const Broadcast: FC = () => {
  const [isLive, setIsLive] = useState(false);

  const startBroadcast = () => {
    setIsLive(true);
  };

  const stopBroadcast = () => {
    setIsLive(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Broadcast</h1>
      <div>
        {isLive ? (
          <div>
            <p className="text-xl">You are now live!</p>
            <button onClick={stopBroadcast} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Stop Broadcast</button>
          </div>
        ) : (
          <button onClick={startBroadcast} className="px-4 py-2 bg-green-500 text-white rounded">Start Broadcast</button>
        )}
      </div>
    </div>
  );
};

export default Broadcast;
