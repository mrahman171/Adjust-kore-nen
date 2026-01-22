// Sound Effects Manager for the game
// Uses Web Audio API for low-latency sound playback

type SoundName =
  | 'click'
  | 'select'
  | 'correct'
  | 'wrong'
  | 'streak'
  | 'levelUp'
  | 'warning'
  | 'gameOver'
  | 'achievement'
  | 'powerUp'
  | 'whoosh'
  | 'stamp'
  | 'paper'
  | 'typing'
  | 'bell'
  | 'success'
  | 'fail';

class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<SoundName, AudioBuffer> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.5;
  private initialized: boolean = false;

  // Initialize audio context (must be called after user interaction)
  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      await this.generateSounds();
      this.initialized = true;
    } catch (e) {
      console.warn('Audio not supported:', e);
    }
  }

  // Generate synthetic sounds using Web Audio API
  private async generateSounds(): Promise<void> {
    if (!this.audioContext) return;

    // Click sound - short tick
    this.sounds.set('click', this.createToneBuffer(800, 0.05, 'sine', 0.3));

    // Select sound - pleasant two-tone
    this.sounds.set('select', this.createTwoToneBuffer(440, 660, 0.08, 'sine', 0.4));

    // Correct answer - ascending happy tones
    this.sounds.set('correct', this.createMelodyBuffer([523, 659, 784], 0.12, 'sine', 0.5));

    // Wrong answer - descending sad tones
    this.sounds.set('wrong', this.createMelodyBuffer([400, 300, 200], 0.15, 'sawtooth', 0.3));

    // Streak sound - exciting rising tone
    this.sounds.set('streak', this.createSweepBuffer(400, 1200, 0.3, 'sine', 0.4));

    // Level up - triumphant fanfare
    this.sounds.set('levelUp', this.createMelodyBuffer([523, 659, 784, 1047], 0.15, 'sine', 0.5));

    // Warning - alert beep
    this.sounds.set('warning', this.createPulseBuffer(600, 3, 0.1, 'square', 0.3));

    // Game over - dramatic descend
    this.sounds.set('gameOver', this.createMelodyBuffer([523, 392, 330, 262], 0.25, 'sawtooth', 0.4));

    // Achievement - celebratory chime
    this.sounds.set('achievement', this.createMelodyBuffer([784, 988, 1175, 1319, 1568], 0.1, 'sine', 0.5));

    // Power up - whoosh up
    this.sounds.set('powerUp', this.createSweepBuffer(200, 800, 0.25, 'sine', 0.4));

    // Whoosh - quick swoosh
    this.sounds.set('whoosh', this.createNoiseBuffer(0.15, 0.3));

    // Stamp - thud
    this.sounds.set('stamp', this.createThudBuffer(100, 0.15, 0.5));

    // Paper - rustle
    this.sounds.set('paper', this.createNoiseBuffer(0.1, 0.2));

    // Typing - keyboard click
    this.sounds.set('typing', this.createToneBuffer(1200, 0.03, 'square', 0.2));

    // Bell - notification
    this.sounds.set('bell', this.createBellBuffer(880, 0.5, 0.4));

    // Success - bright success tone
    this.sounds.set('success', this.createMelodyBuffer([523, 784, 1047], 0.15, 'sine', 0.5));

    // Fail - failure tone
    this.sounds.set('fail', this.createMelodyBuffer([330, 262, 196], 0.2, 'triangle', 0.4));
  }

  // Create a simple tone buffer
  private createToneBuffer(
    frequency: number,
    duration: number,
    type: OscillatorType,
    amplitude: number
  ): AudioBuffer {
    const ctx = this.audioContext!;
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 10); // Quick decay
      let sample = 0;

      switch (type) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'square':
          sample = Math.sign(Math.sin(2 * Math.PI * frequency * t));
          break;
        case 'sawtooth':
          sample = 2 * (t * frequency % 1) - 1;
          break;
        case 'triangle':
          sample = Math.abs(4 * (t * frequency % 1) - 2) - 1;
          break;
      }

      data[i] = sample * envelope * amplitude;
    }

    return buffer;
  }

  // Create two-tone buffer
  private createTwoToneBuffer(
    freq1: number,
    freq2: number,
    duration: number,
    type: OscillatorType,
    amplitude: number
  ): AudioBuffer {
    const ctx = this.audioContext!;
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * duration * 2);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    const halfLength = length / 2;

    for (let i = 0; i < length; i++) {
      const t = (i % halfLength) / sampleRate;
      const freq = i < halfLength ? freq1 : freq2;
      const envelope = Math.exp(-t * 8);
      const sample = Math.sin(2 * Math.PI * freq * t);
      data[i] = sample * envelope * amplitude;
    }

    return buffer;
  }

  // Create melody buffer (sequence of notes)
  private createMelodyBuffer(
    frequencies: number[],
    noteDuration: number,
    type: OscillatorType,
    amplitude: number
  ): AudioBuffer {
    const ctx = this.audioContext!;
    const sampleRate = ctx.sampleRate;
    const noteLength = Math.floor(sampleRate * noteDuration);
    const length = noteLength * frequencies.length;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let n = 0; n < frequencies.length; n++) {
      const freq = frequencies[n];
      const offset = n * noteLength;

      for (let i = 0; i < noteLength; i++) {
        const t = i / sampleRate;
        const envelope = Math.exp(-t * 6);
        let sample = 0;

        switch (type) {
          case 'sine':
            sample = Math.sin(2 * Math.PI * freq * t);
            break;
          case 'sawtooth':
            sample = 2 * (t * freq % 1) - 1;
            break;
          case 'triangle':
            sample = Math.abs(4 * (t * freq % 1) - 2) - 1;
            break;
          default:
            sample = Math.sin(2 * Math.PI * freq * t);
        }

        data[offset + i] = sample * envelope * amplitude;
      }
    }

    return buffer;
  }

  // Create sweep (frequency glide) buffer
  private createSweepBuffer(
    startFreq: number,
    endFreq: number,
    duration: number,
    type: OscillatorType,
    amplitude: number
  ): AudioBuffer {
    const ctx = this.audioContext!;
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = i / length;
      const freq = startFreq + (endFreq - startFreq) * progress;
      const envelope = Math.sin(Math.PI * progress); // Smooth envelope
      const sample = Math.sin(2 * Math.PI * freq * t);
      data[i] = sample * envelope * amplitude;
    }

    return buffer;
  }

  // Create pulse (repeated beep) buffer
  private createPulseBuffer(
    frequency: number,
    count: number,
    beepDuration: number,
    type: OscillatorType,
    amplitude: number
  ): AudioBuffer {
    const ctx = this.audioContext!;
    const sampleRate = ctx.sampleRate;
    const beepLength = Math.floor(sampleRate * beepDuration);
    const gapLength = Math.floor(sampleRate * beepDuration * 0.5);
    const length = (beepLength + gapLength) * count;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let b = 0; b < count; b++) {
      const offset = b * (beepLength + gapLength);

      for (let i = 0; i < beepLength; i++) {
        const t = i / sampleRate;
        const envelope = Math.exp(-t * 5);
        const sample = type === 'square'
          ? Math.sign(Math.sin(2 * Math.PI * frequency * t))
          : Math.sin(2 * Math.PI * frequency * t);
        data[offset + i] = sample * envelope * amplitude;
      }
    }

    return buffer;
  }

  // Create noise buffer (for whoosh/rustle effects)
  private createNoiseBuffer(duration: number, amplitude: number): AudioBuffer {
    const ctx = this.audioContext!;
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const progress = i / length;
      const envelope = Math.sin(Math.PI * progress);
      data[i] = (Math.random() * 2 - 1) * envelope * amplitude;
    }

    return buffer;
  }

  // Create thud/impact buffer
  private createThudBuffer(frequency: number, duration: number, amplitude: number): AudioBuffer {
    const ctx = this.audioContext!;
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 20);
      const freqDecay = frequency * Math.exp(-t * 10);
      const sample = Math.sin(2 * Math.PI * freqDecay * t);
      const noise = (Math.random() * 2 - 1) * 0.2;
      data[i] = (sample + noise) * envelope * amplitude;
    }

    return buffer;
  }

  // Create bell-like buffer with harmonics
  private createBellBuffer(frequency: number, duration: number, amplitude: number): AudioBuffer {
    const ctx = this.audioContext!;
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    const harmonics = [1, 2.4, 3, 4.5, 6.7];
    const harmonicAmps = [1, 0.6, 0.4, 0.3, 0.2];

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 3);
      let sample = 0;

      for (let h = 0; h < harmonics.length; h++) {
        const harmEnv = Math.exp(-t * (3 + h * 2));
        sample += Math.sin(2 * Math.PI * frequency * harmonics[h] * t) * harmonicAmps[h] * harmEnv;
      }

      data[i] = sample * envelope * amplitude / harmonics.length;
    }

    return buffer;
  }

  // Play a sound by name
  play(name: SoundName, volumeMultiplier: number = 1): void {
    if (!this.enabled || !this.audioContext || !this.initialized) return;

    const buffer = this.sounds.get(name);
    if (!buffer) return;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      gainNode.gain.value = this.volume * volumeMultiplier;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start(0);
    } catch (e) {
      console.warn('Error playing sound:', e);
    }
  }

  // Play with random pitch variation (for variety)
  playWithVariation(name: SoundName, pitchRange: number = 0.1): void {
    if (!this.enabled || !this.audioContext || !this.initialized) return;

    const buffer = this.sounds.get(name);
    if (!buffer) return;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      source.playbackRate.value = 1 + (Math.random() - 0.5) * pitchRange * 2;
      gainNode.gain.value = this.volume;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start(0);
    } catch (e) {
      console.warn('Error playing sound:', e);
    }
  }

  // Enable/disable sounds
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', String(enabled));
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // Set volume (0-1)
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundVolume', String(this.volume));
    }
  }

  getVolume(): number {
    return this.volume;
  }

  // Load saved preferences
  loadPreferences(): void {
    if (typeof window !== 'undefined') {
      const savedEnabled = localStorage.getItem('soundEnabled');
      const savedVolume = localStorage.getItem('soundVolume');

      if (savedEnabled !== null) {
        this.enabled = savedEnabled === 'true';
      }
      if (savedVolume !== null) {
        this.volume = parseFloat(savedVolume);
      }
    }
  }
}

// Singleton instance
export const soundManager = new SoundManager();

// React hook for sound manager
import { useEffect, useCallback, useState } from 'react';

export function useSound() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    soundManager.loadPreferences();
    setIsEnabled(soundManager.isEnabled());
    setVolume(soundManager.getVolume());
  }, []);

  const init = useCallback(async () => {
    await soundManager.init();
    setIsInitialized(true);
  }, []);

  const play = useCallback((name: SoundName, volumeMultiplier?: number) => {
    soundManager.play(name, volumeMultiplier);
  }, []);

  const playWithVariation = useCallback((name: SoundName, pitchRange?: number) => {
    soundManager.playWithVariation(name, pitchRange);
  }, []);

  const toggleSound = useCallback(() => {
    const newEnabled = !soundManager.isEnabled();
    soundManager.setEnabled(newEnabled);
    setIsEnabled(newEnabled);
  }, []);

  const updateVolume = useCallback((newVolume: number) => {
    soundManager.setVolume(newVolume);
    setVolume(newVolume);
  }, []);

  return {
    isInitialized,
    isEnabled,
    volume,
    init,
    play,
    playWithVariation,
    toggleSound,
    setVolume: updateVolume,
  };
}
