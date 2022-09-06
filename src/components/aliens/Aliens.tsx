import { observer } from "mobx-react";
import { random } from "lodash";
import store from "mobx/store";
import { FC, useCallback, useLayoutEffect, useRef } from "react";
import { GameState, IAlien } from "types";
import AlienItem from "./AlienItem";
import {
  ALIEN_START_LEFT_POS_MARGIN,
  ALIEN_START_RIGHT_POS_MARGIN,
  ALIEN_START_TOP_POS,
  ALIEN_CREATE_DELAY_AMOUNTS,
} from "utils/settings";

const Aliens: FC<{ board: HTMLDivElement | null }> = observer((props) => {
  const boardCoords = props.board?.getBoundingClientRect() || {
    left: 0,
    right: 0,
    bottom: 0,
  };
  const { gameState, level, createAlien } = store;
  const alienCreatingTimer = useRef<number>(0);

  const createNewAlien = useCallback(() => {
    const alienLeft = random(
      boardCoords.left + ALIEN_START_LEFT_POS_MARGIN,
      boardCoords.right - ALIEN_START_RIGHT_POS_MARGIN,
      false
    );
    createAlien(alienLeft, ALIEN_START_TOP_POS);
    window.clearTimeout(alienCreatingTimer.current);
    const [delayMin, delayMax] = ALIEN_CREATE_DELAY_AMOUNTS;
    const start = Math.max(delayMin / (level * 0.75), 500);
    const end = Math.max(delayMax / (level * 0.75), 1000);
    const delayAmount = random(start, end);

    alienCreatingTimer.current = window.setTimeout(
      () => createNewAlien(),
      delayAmount
    );
  }, [boardCoords.left, boardCoords.right, level, createAlien]);

  useLayoutEffect(() => {
    if (gameState === GameState.Playing) createNewAlien();
    return () => {
      if (alienCreatingTimer.current)
        window.clearTimeout(alienCreatingTimer.current);
    };
  }, [createNewAlien, gameState]);

  if (!props.board || gameState !== GameState.Playing) return null;

  return (
    <>
      {store.aliens.map((el: IAlien) => (
        <AlienItem
          key={el.id}
          id={el.id}
          left={el.left}
          top={el.top}
          boardBottomPos={boardCoords.bottom}
        />
      ))}
    </>
  );
});

export default Aliens;
