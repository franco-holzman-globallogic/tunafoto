import { PlayIcon, PauseIcon, VolumeOnIcon, VolumeOffIcon } from "./Icons";

function ProgressBar({
  progress,
  onSeek,
}: {
  progress: number;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
      onClick={onSeek}
    >
      <div
        className="h-full bg-white rounded-full transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

interface ControlsBarProps {
  playing: boolean;
  muted: boolean;
  progress: number;
  visible: boolean;
  onTogglePlay: (e: React.MouseEvent) => void;
  onToggleMute: (e: React.MouseEvent) => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ControlsBar({
  playing,
  muted,
  progress,
  visible,
  onTogglePlay,
  onToggleMute,
  onSeek,
}: ControlsBarProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <ProgressBar progress={progress} onSeek={onSeek} />

      <div className="flex items-center justify-between">
        <button
          onClick={onTogglePlay}
          className="text-white/80 hover:text-white transition"
          aria-label={playing ? "Pausar" : "Reproducir"}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          onClick={onToggleMute}
          className="text-white/80 hover:text-white transition"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </button>
      </div>
    </div>
  );
}
