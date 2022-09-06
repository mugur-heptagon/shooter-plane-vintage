import planeSound from "assets/plane.ogg";
import shootingSound from "assets/shoot.ogg";
import failSound from "assets/crash.ogg";
import successSound from "assets/success.ogg";
import { ISoundManager } from "types";
import { useAudio } from "utils/useAudio";

const useAudioControls = (): ISoundManager => {
  const planeSoundControls = useAudio(planeSound, true);
  const scoreSoundControls = useAudio(shootingSound, false);
  const failSoundControls = useAudio(failSound, false);
  const winSoundControls = useAudio(successSound, false);

  const soundManager: ISoundManager = {
    planeSoundControls,
    scoreSoundControls,
    failSoundControls,
    winSoundControls,
  };
  return soundManager;
};

export default useAudioControls;
