import { FC, useCallback, useLayoutEffect, useRef } from "react";
import { observer } from "mobx-react";
import store from "mobx/store";
import { GameState, Direction, ISoundManager } from "types";
import planeImage from "assets/plane.png";
import useEventListeners from "utils/useEventListeners";
import { handleShooting, handlePlaneMove } from "./helper";
import styles from "./Plane.module.scss";

const Plane: FC<{ board: HTMLDivElement | null; soundManager: ISoundManager }> =
  observer((props) => {
    const { board, soundManager } = props;
    const { gameState } = store;
    const planeRef = useRef<HTMLImageElement>(null);
    const movingDirection = useRef(Direction.Left);
    const flyTimer = useRef<number>(0);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (gameState !== GameState.Playing) return;

        const key = e.key as Direction;
        if ([Direction.Left, Direction.Right].includes(key)) {
          movingDirection.current = key;
        } else if (key === Direction.Up) {
          handleShooting(planeRef.current!, store.createFireball, soundManager);
        }
      },
      [soundManager, gameState]
    );

    useEventListeners(handleKeyDown);

    const toggleDirection = useCallback(() => {
      movingDirection.current =
        movingDirection.current === Direction.Left
          ? Direction.Right
          : Direction.Left;
    }, []);

    const movePlane = useCallback(() => {
      if (gameState !== GameState.Playing) return;

      handlePlaneMove(
        planeRef.current!,
        board!,
        movingDirection.current,
        store.level,
        toggleDirection
      );
    }, [board, gameState, toggleDirection]);

    const timerTick = useCallback(() => {
      if (gameState !== GameState.Playing) return;
      movePlane();
      flyTimer.current = window.requestAnimationFrame(timerTick);
    }, [gameState, movePlane]);

    useLayoutEffect(() => {
      if (gameState === GameState.Playing) timerTick();
      return () => {
        if (flyTimer.current) cancelAnimationFrame(flyTimer.current);
      };
    }, [gameState, timerTick]);

    return (
      <img
        id="plane"
        className={styles.plane}
        ref={planeRef}
        src={planeImage}
        alt="plane"
      />
    );
  });

export default Plane;
