import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from "lucide-react";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hideTimeout = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);

  /* =============================
     🎬 AUTOPLAY WHEN VIDEO LOADS
  ============================== */
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [src]);

  /* =============================
     ⏳ AUTO HIDE CONTROLS
  ============================== */
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  /* =============================
     ▶️ PLAY / PAUSE
  ============================== */
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  /* =============================
     ⏩ SEEK BAR
  ============================== */
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video.duration) return;

    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const value = Number(e.target.value);

    if (!video.duration) return;

    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };

  /* =============================
     🔊 VOLUME
  ============================== */
  const handleVolume = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    videoRef.current.volume = v;
  };

  /* =============================
     🖥 FULLSCREEN
  ============================== */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative group rounded-2xl overflow-hidden bg-black"
    >
      {/* Ambient AI Glow */}
      <div className="absolute -inset-2 bg-linear-to-r 
          from-purple-600/20 via-blue-600/20 to-purple-600/20 
          blur-2xl opacity-30 group-hover:opacity-60 transition duration-700">
      </div>

      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        className="relative w-full rounded-2xl"
      />

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-6 py-5
        bg-linear-to-t from-black/80 to-transparent
        backdrop-blur-md transition-opacity duration-500
        ${showControls ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* Seekbar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full mb-4 accent-purple-500 cursor-pointer"
        />

        <div className="flex items-center justify-between text-white">

          {/* Left Controls */}
          <div className="flex items-center gap-5">

            <button
              onClick={togglePlay}
              className="hover:scale-110 transition"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <div className="flex items-center gap-2">
              {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolume}
                className="w-24 accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Controls */}
          <button
            onClick={toggleFullscreen}
            className="hover:scale-110 transition"
          >
            {isFullscreen ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
