import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, VolumeX, Gauge } from 'lucide-react';

interface AudioPlayerProps {
  paragraphs: string[];
  activeParagraphIndex: number;
  onParagraphChange: (index: number) => void;
  chapterTitle: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  paragraphs,
  activeParagraphIndex,
  onParagraphChange,
  chapterTitle
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available speech synthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const englishVoices = voices.filter(v => v.lang.startsWith('en'));
      setAvailableVoices(englishVoices.length > 0 ? englishVoices : voices);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Speak a specific paragraph
  const speakParagraph = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (index < 0 || index >= paragraphs.length) {
      stop();
      return;
    }

    window.speechSynthesis.cancel();

    const text = paragraphs[index];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    if (availableVoices[selectedVoiceIndex]) {
      utterance.voice = availableVoices[selectedVoiceIndex];
    }
    if (isMuted) {
      utterance.volume = 0;
    }

    utterance.onend = () => {
      if (index + 1 < paragraphs.length) {
        onParagraphChange(index + 1);
        speakParagraph(index + 1);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    setIsPlaying(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const play = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      speakParagraph(activeParagraphIndex);
    }
  };

  const pause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const stop = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    onParagraphChange(0);
  };

  const skipPrev = () => {
    const nextIdx = Math.max(0, activeParagraphIndex - 1);
    onParagraphChange(nextIdx);
    if (isPlaying) {
      speakParagraph(nextIdx);
    }
  };

  const skipNext = () => {
    const nextIdx = Math.min(paragraphs.length - 1, activeParagraphIndex + 1);
    onParagraphChange(nextIdx);
    if (isPlaying) {
      speakParagraph(nextIdx);
    }
  };

  const cycleSpeed = () => {
    const speeds = [0.8, 1.0, 1.2, 1.5];
    const nextSpeed = speeds[(speeds.indexOf(rate) + 1) % speeds.length];
    setRate(nextSpeed);
    if (isPlaying) {
      speakParagraph(activeParagraphIndex);
    }
  };

  return (
    <div className="sticky top-16 z-30 w-full bg-zinc-950/90 backdrop-blur-md border-y border-amber-500/25 px-4 py-2.5 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
        {/* Title & Playing Indicator */}
        <div className="flex items-center gap-2.5 min-w-[200px]">
          <div className="relative flex items-center justify-center">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-zinc-600'}`} />
            <span className={`absolute w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-amber-400' : 'bg-zinc-600'}`} />
          </div>
          <div>
            <div className="text-xs font-semibold text-amber-200/90 line-clamp-1">
              Audiobook Narration
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              Paragraph {activeParagraphIndex + 1} of {paragraphs.length}
            </div>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={skipPrev}
            disabled={activeParagraphIndex === 0}
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
            title="Previous Paragraph"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {isPlaying ? (
            <button
              onClick={pause}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold shadow-md shadow-amber-500/20 transition-colors text-xs"
              title="Pause"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={play}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold shadow-md shadow-amber-500/20 transition-colors text-xs"
              title="Play Narration"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPaused ? 'Resume' : 'Listen'}</span>
            </button>
          )}

          <button
            onClick={stop}
            disabled={!isPlaying && !isPaused}
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 disabled:opacity-30 transition-colors"
            title="Stop Narration"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>

          <button
            onClick={skipNext}
            disabled={activeParagraphIndex >= paragraphs.length - 1}
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
            title="Next Paragraph"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed & Voice Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 font-mono transition-colors"
            title="Narration Speed"
          >
            <Gauge className="w-3 h-3" />
            <span>{rate.toFixed(1)}x</span>
          </button>

          {availableVoices.length > 0 && (
            <select
              value={selectedVoiceIndex}
              onChange={(e) => {
                setSelectedVoiceIndex(Number(e.target.value));
                if (isPlaying) {
                  speakParagraph(activeParagraphIndex);
                }
              }}
              className="bg-zinc-900 text-zinc-300 border border-zinc-700 rounded px-2 py-1 text-xs max-w-[140px] truncate focus:outline-none focus:border-amber-500"
            >
              {availableVoices.map((v, i) => (
                <option key={i} value={i}>
                  {v.name.split(' ')[0]} ({v.lang})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};
