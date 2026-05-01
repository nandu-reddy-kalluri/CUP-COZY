import { useState, useRef, useCallback } from "react";

export function useAmbient() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioCtxRef = useRef(null);
  const gainRef = useRef(null);
  const nodesRef = useRef([]);

  const createNoise = useCallback((audioCtx, gainNode) => {
    // Create brown noise buffer (café chatter simulation)
    const bufferSize = audioCtx.sampleRate * 4;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Low-pass filter for warmth
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400;
    filter.Q.value = 1;

    // Subtle reverb feel with another filtered layer
    const filter2 = audioCtx.createBiquadFilter();
    filter2.type = "bandpass";
    filter2.frequency.value = 800;
    filter2.Q.value = 0.5;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.value = 0.7;

    noiseSource.connect(filter);
    filter.connect(filter2);
    filter2.connect(noiseGain);
    noiseGain.connect(gainNode);
    noiseSource.start();

    return noiseSource;
  }, []);

  const createTone = useCallback((audioCtx, gainNode, freq, vol) => {
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    const oscGain = audioCtx.createGain();
    oscGain.gain.value = vol;

    osc.connect(oscGain);
    oscGain.connect(gainNode);
    osc.start();

    return osc;
  }, []);

  const start = useCallback(() => {
    if (audioCtxRef.current) return;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = audioCtx;

    const gain = audioCtx.createGain();
    gain.gain.value = 0;
    gain.connect(audioCtx.destination);
    gainRef.current = gain;

    // Fade in
    gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.5);

    // Create ambient layers
    const noise = createNoise(audioCtx, gain);
    const tone1 = createTone(audioCtx, gain, 220, 0.03); // Warm low hum
    const tone2 = createTone(audioCtx, gain, 330, 0.015); // Gentle fifth

    nodesRef.current = [noise, tone1, tone2];
    setIsPlaying(true);
  }, [volume, createNoise, createTone]);

  const stop = useCallback(() => {
    if (!audioCtxRef.current || !gainRef.current) return;

    const audioCtx = audioCtxRef.current;
    const gain = gainRef.current;

    // Fade out
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);

    setTimeout(() => {
      nodesRef.current.forEach((node) => {
        try { node.stop(); } catch {}
      });
      nodesRef.current = [];
      audioCtx.close();
      audioCtxRef.current = null;
      gainRef.current = null;
    }, 600);

    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }, [isPlaying, start, stop]);

  const changeVolume = useCallback((newVol) => {
    setVolume(newVol);
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(
        newVol,
        audioCtxRef.current.currentTime + 0.1
      );
    }
  }, []);

  return { isPlaying, volume, toggle, changeVolume };
}

export default useAmbient;
