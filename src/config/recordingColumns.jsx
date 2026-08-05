// src/config/recordingColumns.jsx
import { useState, useRef } from 'react';
import { Download, Play, Pause } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { getListColor, recordingStatusLabels, recordingStatusColors } from '../utils/statusConstants';
import { checkboxClass } from '../styles/checkboxClass';
import { getInitials, getAvatarColor } from '../utils/avatar';

const formatShortDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// Composant lecteur audio personnalisé et compact
const CustomAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const seekPercent = parseFloat(e.target.value);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (seekPercent / 100) * audioRef.current.duration;
      setProgress(seekPercent);
    }
  };

  return (
    <div
      className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 w-44 shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="none"
      />
      <button
        type="button"
        onClick={togglePlay}
        className="w-6 h-6 rounded-full bg-[#1EB394] text-white flex items-center justify-center hover:bg-[#18967c] transition-colors shrink-0 cursor-pointer"
      >
        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1EB394]"
      />
    </div>
  );
};

// Fonction utilitaire de téléchargement de fichier
const downloadAudioFile = (url, fileName) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const recordingColumns = (selectedIds, onToggleSelect) => [
  {
    key: 'select',
    label: '',
    render: (row) => (
      <input
        type="checkbox"
        checked={selectedIds.includes(row.id)}
        onChange={(e) => {
          e.stopPropagation();
          onToggleSelect(row.id);
        }}
        className={checkboxClass}
      />
    ),
  },
  {
    key: 'date',
    label: 'Date',
    render: (row) => (
      <span className="text-xs text-gray-700 whitespace-nowrap">
        {new Date(row.date).toLocaleString('fr-FR')}
      </span>
    ),
  },
  {
    key: 'agent',
    label: 'Agent',
    render: (row) => (
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${getAvatarColor(
            row.id
          )}`}
        >
          {getInitials(row.agent)}
        </div>
        <p className="font-bold text-[12px] leading-[20px] tracking-normal align-middle whitespace-nowrap">
          {row.agent}
        </p>
      </div>
    ),
  },
  {
    key: 'phone',
    label: 'Téléphone',
    render: (row) => (
      <span className="text-xs font-mono text-gray-700 whitespace-nowrap">{row.phone}</span>
    ),
  },
  {
    key: 'status',
    label: 'Statut',
    render: (row) => (
      <StatusBadge
        status={row.status}
        statusLabels={recordingStatusLabels}
        statusColors={recordingStatusColors}
      />
    ),
  },
  {
    key: 'list',
    label: 'Liste',
    render: (row) => (
      <span
        className={`inline-flex items-center justify-center whitespace-nowrap px-2.5 py-1 rounded-full font-bold text-[11px] leading-none ${getListColor(
          row.list
        )}`}
      >
        {row.list}
      </span>
    ),
  },
  {
    key: 'duration',
    label: 'Durée',
    render: (row) => (
      <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
        {formatShortDuration(row.duration)}
      </span>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (row) => {
      const audioUrl = row.url || `/mock/recordings/${row.id}.mp3`;

      return (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <CustomAudioPlayer src={audioUrl} />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              downloadAudioFile(audioUrl, `enregistrement-${row.id}.mp3`);
            }}
            title="Télécharger"
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      );
    },
  },
];