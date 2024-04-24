import DrumPad from './DrumPad';
import Metronome from './Metronome';
import AudioContextProvider from './AudioContext';

export default function DrumMaschine() {
  return (
    <div>
      <h1>Drum Maschine</h1>
      <p>Click on the pads to play the sound</p>
      <AudioContextProvider>
        <Metronome />
        <section className="grid grid-cols-4 grid-rows-4">
          <DrumPad name="hi-hat-1" audioSrc="/audio/RDM_Analog_SY1-ClHat.wav" />
          <DrumPad name="hi-hat-2" audioSrc="/audio/RDM_Analog_SY1-HfHat.wav" />
          <DrumPad name="hi-hat-3" audioSrc="/audio/RDM_Analog_SY1-OpHat.wav" />
          <DrumPad name="kick-1" audioSrc="/audio/RDM_Analog_SY1-Kick01.wav" />
          <DrumPad name="kick-2" audioSrc="/audio/RDM_Analog_SY1-Kick02.wav" />
          <DrumPad name="kick-3" audioSrc="/audio/RDM_Analog_SY1-Kick03.wav" />
          <DrumPad name="kick-4" audioSrc="/audio/RDM_Analog_SY1-Kick04.wav" />
          <DrumPad name="perc-1" audioSrc="/audio/RDM_Analog_SY1-Perc01.wav" />
          <DrumPad name="perc-2" audioSrc="/audio/RDM_Analog_SY1-Perc02.wav" />
          <DrumPad name="perc-3" audioSrc="/audio/RDM_Analog_SY1-Perc03.wav" />
          <DrumPad name="perc-4" audioSrc="/audio/RDM_Analog_SY1-Perc04.wav" />
          <DrumPad name="snare-1" audioSrc="/audio/RDM_Analog_SY1-Snr01.wav" />
          <DrumPad name="snare-2" audioSrc="/audio/RDM_Analog_SY1-Snr02.wav" />
          <DrumPad name="snare-3" audioSrc="/audio/RDM_Analog_SY1-Snr03.wav" />
          <DrumPad name="tom-1" audioSrc="/audio/RDM_Analog_SY1-Tom01.wav" />
          <DrumPad name="tom-2" audioSrc="/audio/RDM_Analog_SY1-Tom02.wav" />
          <DrumPad name="tom-3" audioSrc="/audio/RDM_Analog_SY1-Tom03.wav" />
        </section>
      </AudioContextProvider>
    </div>
  );
}
