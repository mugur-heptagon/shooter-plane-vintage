import { FC, useEffect, useCallback, useRef } from "react";
import { observer } from "mobx-react";
import store from "mobx/store";
import { GameState, ISoundManager } from "types";
import useAudioControls from "utils/useAudioControls";
import FireBalls from "components/fireballs/FireBalls";
import Aliens from "components/aliens/Aliens";
import Plane from "components/plane/Plane";
import { handleGameStart, handleGameStop, handleScore } from "./helper";
import styles from "./Scene.module.scss";

const Scene: FC = observer(() => {
  const boardRef = useRef<HTMLDivElement>(null);
  const soundManager: ISoundManager = useAudioControls();
  const { gameState, increaseScore, destroyAlien } = store;
  const controlsTimer = useRef<number>(0);

  const checkScore = useCallback(() => {
    handleScore(increaseScore, destroyAlien);
  }, [increaseScore, destroyAlien]);

  const timerTick = useCallback(() => {
    if (gameState !== GameState.Playing) return;
    checkScore();
    controlsTimer.current = window.requestAnimationFrame(timerTick);
  }, [gameState, checkScore]);

  const startGame = useCallback(() => {
    if (!boardRef.current) return;
    handleGameStart(boardRef.current, timerTick, soundManager);
  }, [timerTick, soundManager]);

  const stopGame = useCallback(() => {
    if (!boardRef.current) return;
    handleGameStop(boardRef.current, gameState, soundManager);
  }, [gameState, soundManager]);

  useEffect(() => {
    if (gameState === GameState.Playing) {
      startGame();
    } else {
      stopGame();
    }
    return () => {
      if (controlsTimer.current)
        window.cancelAnimationFrame(controlsTimer.current);
    };
  }, [gameState, startGame, stopGame]);

  return (
    <div id="gameBoard" ref={boardRef} className={styles.gameBoard}>
      <Plane board={boardRef.current} soundManager={soundManager} />
      <FireBalls />
      <Aliens board={boardRef.current} />
    </div>
  );
});

export default Scene;
