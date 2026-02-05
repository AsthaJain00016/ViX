import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Minimize,
} from "lucide-react";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeout = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  /* ---------------- Fullscreen Sync ---------------- */
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  /* ---------------- Keyboard Shortcuts ---------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === "INPUT") return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying, isFullscreen]);

  /* ---------------- Controls Auto-Hide ---------------- */
  const showControlsTemporarily = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);
  };

  /* ---------------- Play / Pause ---------------- */
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  /* ---------------- Fullscreen ---------------- */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  /* ---------------- Progress ---------------- */
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const seekVideo = (e) => {
    const video = videoRef.current;
    video.currentTime = (e.target.value / 100) * video.duration;
  };

  /* ---------------- Volume ---------------- */
  const changeVolume = (e) => {
    const v = e.target.value;
    setVolume(v);
    videoRef.current.volume = v;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={showControlsTemporarily}
      onDoubleClick={toggleFullscreen}
      className="relative bg-black rounded-lg overflow-hidden select-none"
    >
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        className={`w-full ${
          isFullscreen ? "h-screen object-contain" : "h-105 object-cover"
        }`}
      />

      {/* Controls */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={seekVideo}
          className="w-full mb-3 accent-purple-500 cursor-pointer"
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}>
              {isPlaying ? <Pause /> : <Play />}
            </button>

            <div className="flex items-center gap-2">
              <Volume2 />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={changeVolume}
                className="w-20 accent-purple-500"
              />
            </div>
          </div>

          <button onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize /> : <Maximize />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
