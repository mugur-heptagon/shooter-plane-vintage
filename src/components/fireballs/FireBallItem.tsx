import { FC, useLayoutEffect, useState, useCallback, useRef } from "react";
import store from "mobx/store";
import { FIREBALL_MOVE_AMOUNT } from "utils/settings";
import { ILocation } from "types";
import styles from "./Fireballs.module.scss";

const FireBallItem: FC<{ id: string } & ILocation> = (props) => {
  const { id, left, top } = props;
  const { destroyFireball } = store;
  const [newTop, setNewTop] = useState(top);
  const frameTimer = useRef(0);

  const moveUp = useCallback(
    (currentTop: number) => {
      if (currentTop > 0) {
        const nextTop = currentTop - FIREBALL_MOVE_AMOUNT;
        setNewTop(nextTop);
        frameTimer.current = window.requestAnimationFrame(() =>
          moveUp(nextTop)
        );
      } else {
        destroyFireball(id);
      }
    },
    [id, destroyFireball]
  );

  useLayoutEffect(() => {
    moveUp(top);
    return () => {
      if (frameTimer.current) cancelAnimationFrame(frameTimer.current);
      destroyFireball(id);
    };
  }, [id, top, moveUp, destroyFireball]);

  return (
    <div className={styles.fire} id={id} style={{ left, top: newTop }}></div>
  );
};

export default FireBallItem;
