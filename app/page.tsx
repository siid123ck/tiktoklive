// pages/index.tsx

"use client"

import { useState } from 'react';
import VideoPlayer from './component/VideoPlayer';

const videos = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-40s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-50s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-60s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-70s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-80s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-90s.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-100s.mp4'
];
const Home = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className="container min-h-screen m-auto p-8">
      {videos.map((video, index) => (
        <div key={index} className="w-full h-full flex justify-center items-center">
          <VideoPlayer url={video}
            isActive={index === activeIndex} 
            onPlay={() => handlePlay(index)}  />
        </div>
      ))}
    </div>
  );
};

export default Home;
