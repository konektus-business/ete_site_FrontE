// src/components/recordings/CustomAudioPlayer.jsx
import { useState, useRef, useMemo, useEffect } from 'react';
import { Pause, Mic } from 'lucide-react';

const formatShortDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// Génère une hauteur de barre pseudo-aléatoire mais stable (seedée sur un id)
// -> le waveform ne "saute" pas à chaque re-render, chaque enregistrement garde sa forme
const generateWaveform = (seed, count = 28) => {
  let x = 0;
  for (let i = 0; i < String(seed).length; i++) x = (x * 31 + String(seed).charCodeAt(i)) % 100000;

  const bars = [];
  for (let i = 0; i < count; i++) {
    x = (x * 9301 + 49297) % 233280;
    const rnd = x / 233280;
    // hauteur entre 4px et 16px, avec un léger effet de "vague"
    const wave = Math.sin(i * 0.5) * 3;
    bars.push(Math.max(4, Math.min(16, 8 + rnd * 8 + wave)));
  }
  return bars;
};

// Registre partagé entre TOUTES les instances de CustomAudioPlayer.
// Permet de savoir quel lecteur est actuellement actif, pour le couper
// automatiquement dès qu'un autre démarre (un seul son à la fois).
const audioPlayerRegistry = {
  current: null, // { audio: HTMLAudioElement, stop: () => void }
};

// Composant lecteur audio personnalisé — badge micro + waveform, style CRM
export default function CustomAudioPlayer({ src, seed }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const bars = useMemo(() => generateWaveform(seed), [seed]);

  // Si la ligne est démontée (changement de page, filtre...) pendant que ça joue,
  // on retire ce lecteur du registre pour ne pas laisser une référence morte.
  useEffect(() => {
    return () => {
      if (audioPlayerRegistry.current?.audio === audioRef.current) {
        audioPlayerRegistry.current = null;
      }
    };
  }, []);

  const stopThisPlayer = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (audioPlayerRegistry.current?.audio === audioRef.current) {
        audioPlayerRegistry.current = null;
      }
      return;
    }

    // Coupe le lecteur précédemment actif (s'il y en a un autre que soi-même)
    if (audioPlayerRegistry.current && audioPlayerRegistry.current.audio !== audioRef.current) {
      audioPlayerRegistry.current.stop();
    }

    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
    audioPlayerRegistry.current = { audio: audioRef.current, stop: stopThisPlayer };
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(pct || 0);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setTotalDuration(audioRef.current.duration || 0);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (audioPlayerRegistry.current?.audio === audioRef.current) {
      audioPlayerRegistry.current = null;
    }
  };

  // Permet de cliquer directement sur une barre du waveform pour naviguer
  const handleSeekClick = (e, index) => {
    e.stopPropagation();
    if (!audioRef.current || !totalDuration) return;
    const pct = (index / (bars.length - 1)) * 100;
    audioRef.current.currentTime = (pct / 100) * totalDuration;
    setProgress(pct);
  };

  const playedBars = Math.round((progress / 100) * bars.length);

  return (
    <div
      className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-full pl-1.5 pr-3 py-1.5 w-52 shrink-0 transition-colors hover:border-gray-300"
      onClick={(e) => e.stopPropagation()}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Badge micro — vert quand ça joue, gris neutre en pause */}
      {/* Variante "rouge en pause" : remplacer bg-gray-300 par bg-red-500 ci-dessous */}
      <button
        type="button"
        onClick={togglePlay}
        title={isPlaying ? 'Mettre en pause' : 'Écouter'}
        className={`relative w-7 h-7 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-200 ${
          isPlaying ? 'bg-[#1EB394]' : 'bg-gray-300'
        }`}
      >
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-[#1EB394] animate-ping opacity-40" />
        )}
        {isPlaying ? (
          <Pause className="w-3 h-3 text-white relative fill-white" />
        ) : (
          <Mic className="w-3.5 h-3.5 text-white relative" />
        )}
      </button>

      {/* Waveform cliquable */}
      <div className="flex items-center gap-[2px] flex-1 h-4">
        {bars.map((height, i) => (
          <div
            key={i}
            onClick={(e) => handleSeekClick(e, i)}
            className={`flex-1 rounded-full cursor-pointer transition-colors duration-150 ${
              i < playedBars ? 'bg-[#1EB394]' : 'bg-gray-300'
            }`}
            style={{ height: `${height}px` }}
          />
        ))}
      </div>

      <span className="text-[10px] font-mono text-gray-400 tabular-nums shrink-0">
        {formatShortDuration(isPlaying || currentTime ? currentTime : totalDuration)}
      </span>
    </div>
  );
}