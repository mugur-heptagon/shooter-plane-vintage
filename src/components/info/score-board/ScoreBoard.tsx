import { FC } from "react";
import store from "mobx/store";
import { observer } from "mobx-react";
import styles from "./ScoreBoard.module.scss";

const ScoreBoard: FC = observer(() => {
  const { score } = store;
  return (
    <div className={styles.scoreBoard}>
      <span> {score}</span>
    </div>
  );
});

export default ScoreBoard;
