import { action, makeObservable, observable } from "mobx";
import { random, delay } from "lodash";
import { GameState, IAlien, IFireball, IMovingObject, IStore } from "types";
import {
  INITIAL_HEALTH_AMOUNT,
  POINTS_FOR_LEVEL_UP,
  POINTS_PER_SHOOT,
  POINTS_FOR_WIN,
  TIMEOUT_LIMIT,
} from "utils/settings";

class Store implements IStore {
  public score: number = 0;
  public elapsedTime: number = 0;
  public level: number = 1;
  public gameState: GameState = GameState.NotStarted;
  public fireballs: IFireball[] = [];
  public aliens: IAlien[] = [];
  public health: number = INITIAL_HEALTH_AMOUNT;

  constructor() {
    makeObservable(this, {
      score: observable,
      elapsedTime: observable,
      gameState: observable,
      level: observable,
      fireballs: observable,
      aliens: observable,
      health: observable,

      increaseScore: action,
      increaseTime: action,
      updateGameState: action,
      createFireball: action,
      destroyFireball: action,
      createAlien: action,
      destroyAlien: action,
      decreaseHealth: action,
    });
  }

  public increaseScore = (): void => {
    this.score += POINTS_PER_SHOOT;
    if (this.score % POINTS_FOR_LEVEL_UP === 0) this.increaseLevel();
    if (this.score >= POINTS_FOR_WIN) this.updateGameState(GameState.Won);
  };

  public increaseTime = (): void => {
    this.elapsedTime += 1;
    if (this.elapsedTime >= TIMEOUT_LIMIT)
      this.updateGameState(GameState.Failed);
  };

  public increaseLevel = (): void => {
    this.level += 1;
  };

  public updateGameState = (newState: GameState): void => {
    this.gameState = newState;
  };

  public createFireball = (left: number, top: number): void => {
    this.createMovingObject("fireball_", this.fireballs, left, top);
  };

  public destroyFireball = (id: string): void => {
    this.fireballs = this.destroyMovingObject(id, this.fireballs);
  };

  public createAlien = (left: number, top: number): void => {
    this.createMovingObject("alien_", this.aliens, left, top);
  };

  public destroyAlien = (id: string): void => {
    this.aliens = this.destroyMovingObject(id, this.aliens);
  };

  public decreaseHealth = (): void => {
    this.health--;
    //wait for UI to update itself
    if (this.health === 0) {
      delay(() => this.updateGameState(GameState.Failed), 500);
    }
  };

  private createMovingObject = (
    prefix: string,
    container: IMovingObject[],
    left: number,
    top: number
  ) => {
    const movingObject: IMovingObject = {
      id: prefix + container.length + random(100, 9999),
      left,
      top,
    };
    container.push(movingObject);
  };

  private destroyMovingObject = (id: string, container: IMovingObject[]) => {
    return container.filter((el) => el.id !== id);
  };
}

const store: IStore = new Store();
export default store;
