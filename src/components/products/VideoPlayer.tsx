"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeatureFlag } from "@/lib/feature-flags";

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function VideoPlayer({
  videoUrl,
  thumbnail,
  title = "Product Walkthrough",
  description,
  autoPlay = false,
  controls = true,
  muted = true,
  loop = false,
  width = "100%",
  height = "auto",
  className = "",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const videoEnabled = useFeatureFlag('FEATURE_VIDEO_PLAYER');

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // If video feature is disabled, show placeholder
  if (!videoEnabled) {
    return (
      <div 
        className={`relative bg-gradient-to-br from-brown-200 to-brown-300 rounded-lg overflow-hidden ${className}`}
        style={{ width, height: height === "auto" ? "300px" : height }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold text-textPrimary mb-2">{title}</h3>
          {description && (
            <p className="text-textPrimary/80 text-sm">{description}</p>
          )}
          <p className="text-xs text-textPrimary/80 mt-4 opacity-75">
            Video feature coming soon
          </p>
        </div>
      </div>
    );
  }

  // If no video URL provided, show placeholder
  if (!videoUrl || hasError) {
    return (
      <div 
        className={`relative bg-gradient-to-br from-brown-200 to-brown-300 rounded-lg overflow-hidden ${className}`}
        style={{ width, height: height === "auto" ? "300px" : height }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="text-6xl mb-4">📹</div>
          <h3 className="text-xl font-semibold text-textPrimary mb-2">{title}</h3>
          {description && (
            <p className="text-textPrimary/80 text-sm mb-4">{description}</p>
          )}
          <p className="text-xs text-textPrimary/80 opacity-75">
            {hasError ? "Video unavailable" : "Video coming soon"}
          </p>
        </div>
      </div>
    );
  }

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      videoRef.current.play();
    }
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Video event handlers
  const handleLoadedData = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
      style={{ width, height }}
      onMouseMove={showControlsTemporarily}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnail}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleError}
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        <p className="text-white p-4">
          Your browser does not support the video element. 
          <a href={videoUrl} className="underline ml-1">Download the video</a>
        </p>
      </video>

      {/* Loading Overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-center">
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && isLoaded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            onClick={togglePlay}
            className="w-20 h-20 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-black transition-all duration-200 shadow-large"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-8 h-8 ml-1" />
          </motion.button>
        </motion.div>
      )}

      {/* Controls */}
      {controls && isLoaded && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showControls ? 1 : 0, 
            y: showControls ? 0 : 20 
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Progress Bar */}
          <div 
            className="w-full h-2 bg-white bg-opacity-30 rounded-full cursor-pointer mb-4"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-white rounded-full transition-all duration-200"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:text-black hover:bg-white p-2 rounded-full"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={restartVideo}
                className="text-white hover:text-black hover:bg-white p-2 rounded-full"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-white hover:text-black hover:bg-white p-2 rounded-full"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <div className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-white text-sm">{title}</div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:text-black hover:bg-white p-2 rounded-full"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
