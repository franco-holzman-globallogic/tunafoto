"use client";

import { PlayIcon } from "./video-player/Icons";
import ControlsBar from "./video-player/ControlsBar";
import { useVideoPlayer } from "./video-player/useVideoPlayer";

interface VideoPlayerProps {
  src: string;
  titulo: string;
  descripcion: string;
}

export default function VideoPlayer({ src, titulo, descripcion }: VideoPlayerProps) {
  const {
    videoRef,
    containerRef,
    playing,
    muted,
    progress,
    showControls,
    togglePlay,
    toggleMute,
    handleTimeUpdate,
    handleSeek,
    revealControls,
    handleKeyDown,
  } = useVideoPlayer();

  return (
    <div className="group" ref={containerRef}>
      {/* Video area */}
      <div
        className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={togglePlay}
        onKeyDown={handleKeyDown}
        onMouseMove={revealControls}
        onTouchStart={revealControls}
      >
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          aria-label={`Video: ${titulo}`}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />

        {/* Play overlay (paused state) */}
        {!playing && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <PlayIcon className="w-16 h-16 text-white/80" />
          </div>
        )}

        <ControlsBar
          playing={playing}
          muted={muted}
          progress={progress}
          visible={showControls || !playing}
          onTogglePlay={(e) => { e.stopPropagation(); togglePlay(); }}
          onToggleMute={(e) => { e.stopPropagation(); toggleMute(); }}
          onSeek={handleSeek}
        />
      </div>

      {/* Caption */}
      <div className="mt-4 text-center space-y-1">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-500">{titulo}</p>
        <p className="text-xs uppercase text-gray-500">{descripcion}</p>
      </div>
    </div>
  );
}
