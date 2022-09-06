import { FC } from "react";
import store from "mobx/store";
import { observer } from "mobx-react";
import { INITIAL_HEALTH_AMOUNT } from "utils/settings";
import styles from "./Health.module.scss";

const HealthItem: FC<{ alive: boolean }> = (props) => (
  <span className={props.alive ? styles.alive : styles.dead}></span>
);

const Health: FC = observer(() => {
  const { health } = store;
  return (
    <div className={styles.health}>
      {new Array(health).fill(null).map((_, i) => (
        <HealthItem key={i} alive={true} />
      ))}
      {new Array(INITIAL_HEALTH_AMOUNT - health).fill(null).map((_, i) => (
        <HealthItem key={i} alive={false} />
      ))}
    </div>
  );
});

export default Health;
