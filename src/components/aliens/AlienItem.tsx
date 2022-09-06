import { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import store from "mobx/store";
import { ALIEN_MOVE_AMOUNT, ALIEN_END_BOTTOM_POS_MARGIN } from "utils/settings";
import { ILocation } from "types";
import alienImage from "assets/alien.png";
import styles from "./Aliens.module.scss";

const AlienItem: FC<
  {
    id: string;
    boardBottomPos: number;
  } & ILocation
> = (props) => {
  const { id, boardBottomPos, left, top } = props;
  const { destroyAlien, decreaseHealth } = store;
  const [newTop, setNewTop] = useState(top);

  const selfDestroyTimer = useRef<number>(0);
  const moveDownTimer = useRef<number>(0);

  const delayedSelfDestroy = useCallback(
    (id: string) => {
      if (selfDestroyTimer.current) clearTimeout(selfDestroyTimer.current);
      selfDestroyTimer.current = window.setTimeout(() => {
        destroyAlien(id);
        decreaseHealth();
      }, 250);
    },
    [decreaseHealth, destroyAlien]
  );

  const moveDown = useCallback(
    (currentTop: number) => {
      if (currentTop < boardBottomPos - ALIEN_END_BOTTOM_POS_MARGIN) {
        const nextTop = currentTop + ALIEN_MOVE_AMOUNT;
        setNewTop(nextTop);
        moveDownTimer.current = window.requestAnimationFrame(() =>
          moveDown(nextTop)
        );
      } else {
        delayedSelfDestroy(id);
      }
    },
    [id, boardBottomPos, delayedSelfDestroy]
  );

  useLayoutEffect(() => {
    moveDown(top);
    return () => {
      if (moveDownTimer.current)
        window.cancelAnimationFrame(moveDownTimer.current);
      if (selfDestroyTimer.current) clearTimeout(selfDestroyTimer.current);
      destroyAlien(id);
    };
  }, [id, top, moveDown, destroyAlien]);

  return (
    <img
      className={styles.alien}
      id={id}
      style={{ left, top: newTop }}
      src={alienImage}
      alt="alien"
    />
  );
};

export default AlienItem;
