import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, Maximize, Minimize } from "lucide-react";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  /* FULLSCREEN SYNC */
  useEffect(() => {
    const handler = () =>
      setIsFullscreen(!!document.fullscreenElement);

    document.addEventListener("fullscreenchange", handler);
    return () =>
      document.removeEventListener("fullscreenchange", handler);
  }, []);

  /* AUTO PLAY */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [src]);

  /* PLAY / PAUSE */
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  /* PROGRESS */
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    setProgress((video.currentTime / video.duration) * 100);
  };

  const seekVideo = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const value = parseFloat(e.target.value);
    video.currentTime = (value / 100) * video.duration;
  };

  /* VOLUME */
  const changeVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);

    if (videoRef.current) {
      videoRef.current.volume = v;
    }
  };

  /* FULLSCREEN */
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-black rounded-xl overflow-hidden"
    >
      <video
        ref={videoRef}
        src={src || undefined}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-125 object-contain bg-black"
      />

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
        
        {/* Progress */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={seekVideo}
          className="w-full mb-3 accent-purple-500"
        />

        <div className="flex justify-between items-center text-white">
          
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <div className="flex items-center gap-2">
              <Volume2 size={18} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={changeVolume}
                className="w-24 accent-purple-500"
              />
            </div>
          </div>

          <button onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize size={20} />
            ) : (
              <Maximize size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
