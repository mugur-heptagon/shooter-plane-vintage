import { GameState, ISoundManager } from "types";
import { showAlert, playSound, stopSound } from "utils";
import sceneStyles from "components/scene/Scene.module.scss";

export const handleGameStart = (
  board: HTMLDivElement,
  timerTick: Function,
  soundManager: ISoundManager
): void => {
  //background slides down to achieve perception of movement
  board?.classList.add(sceneStyles.movingBackground);
  timerTick();
  playSound(soundManager.planeSoundControls);
};

export const handleGameStop = (
  board: HTMLDivElement,
  gameState: GameState,
  soundManager: ISoundManager
): void => {
  if (!board || !soundManager) return;

  //background slide needs to stop when game stops
  board.classList.remove(sceneStyles.movingBackground);

  //play appropriate sound depending on GameState and stop background plane propeller sound
  stopSound(soundManager.planeSoundControls);
  if (gameState === GameState.Failed) {
    playSound(soundManager.failSoundControls);
    showAlert(gameState);
  } else if (gameState === GameState.Won) {
    playSound(soundManager.winSoundControls);
    showAlert(gameState);
  }
};

export const handleScore = (
  increaseScore: Function,
  destroyAlien: Function
) => {
  const fireballs = document.querySelectorAll("[id^='fireball']");
  const aliens = document.querySelectorAll("[id^='alien']");

  //check for each fireball if it hits any of the aliens
  fireballs.forEach((fireball: Element) => {
    const ballCoords = fireball.getBoundingClientRect();
    aliens.forEach((alien: Element) => {
      const alienCoords = alien.getBoundingClientRect();
      const horizontalCheck =
        ballCoords.left <= alienCoords.right &&
        ballCoords.right >= alienCoords.left;
      const verticalCheck =
        ballCoords.top <= alienCoords.bottom &&
        ballCoords.top >= alienCoords.top;
      if (horizontalCheck && verticalCheck) {
        increaseScore();
        destroyAlien(alien.id);
      }
    });
  });
};
