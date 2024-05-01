import DrumPad from './DrumPad';
import Metronome from './Metronome';
import AudioContextProvider from './AudioContext';

export default function DrumMaschine() {
  return (
    <div>
      <AudioContextProvider>
        <div className="p-8">
          <h2>Metronome</h2>
          <Metronome />
        </div>
        <div className="p-8">
          <h2>Drum Maschine</h2>
          <section className="grid grid-cols-4 grid-rows-4">
            <DrumPad name="kick-1" audioSrc="/audio/RDM_Analog_SY1-Kick01.wav" />
          </section>
        </div>
      </AudioContextProvider>
    </div>
  );
}
