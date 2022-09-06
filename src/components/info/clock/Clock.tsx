import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import store from "mobx/store";
import { GameState } from "types";
import styles from "./Clock.module.scss";

const Clock: FC = observer(() => {
  const { gameState, elapsedTime, increaseTime } = store;

  useEffect(() => {
    let timer: number = 0;
    if (gameState === GameState.Playing) {
      if (!timer) {
        timer = window.setInterval(() => increaseTime(), 1000);
      }
    } else {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, increaseTime]);

  return (
    <div className={styles.clock}>
      <span>{elapsedTime}</span>
    </div>
  );
});

export default Clock;
