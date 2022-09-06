export enum Direction {
  Left = "ArrowLeft",
  Right = "ArrowRight",
  Up = "ArrowUp",
  Down = "ArrowDown",
}

export enum GameState {
  NotStarted = "NotStarted",
  Playing = "Playing",
  Failed = "Failed",
  Won = "Won",
}

export interface ISoundManager {
  planeSoundControls?: Function[];
  scoreSoundControls?: Function[];
  failSoundControls?: Function[];
  winSoundControls?: Function[];
}

export interface IStore {
  score: number;
  elapsedTime: number;
  level: number;
  gameState: GameState;
  fireballs: IFireball[];
  aliens: IAlien[];
  health: number;

  increaseScore(): void;
  increaseTime(): void;
  updateGameState(newState: GameState): void;
  createFireball(left: number, top: number): void;
  destroyFireball(id: string): void;
  createAlien(left: number, top: number): void;
  destroyAlien(id: string): void;
  decreaseHealth(): void;
  increaseLevel(): void;
}

export interface ILocation {
  left: number;
  top: number;
  right?: number;
  bottom?: number;
}

export interface IMovingObject extends ILocation {
  id: string;
}

export interface IFireball extends IMovingObject {}

export interface IAlien extends IMovingObject {}
