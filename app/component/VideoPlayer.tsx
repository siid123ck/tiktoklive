// components/VideoPlayer.tsx

import { FC, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
  isActive: boolean;
  onPlay: () => void;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ url, isActive, onPlay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <div className="w-full h-full flex justify-center items-center p-8">
      <video 
        ref={videoRef} 
        className="w-full h-full" 
        controls 
        onPlay={onPlay}
      >
        <source src={url} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
