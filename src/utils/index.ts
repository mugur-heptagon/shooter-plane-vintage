import { GameState } from "types";

export const playSound = (soundControls?: Function[]): void => {
  if (soundControls) {
    const [play] = soundControls;
    play();
  }
};

export const stopSound = (soundControls?: Function[]): void => {
  if (soundControls) {
    const [play, stop] = soundControls;
    stop();
  }
};

export const showAlert = (gameState: GameState): void => {
  alert(gameState === GameState.Failed ? "You failed!" : "You won!");
  window.location.reload();
};
