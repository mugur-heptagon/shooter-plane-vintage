import debounce from "lodash.debounce";
import { DebouncedFunc } from "lodash";
import { Direction, ISoundManager } from "types";
import { playSound } from "utils";
import {
  FIREBALL_START_LEFT_POS_MARGIN,
  FIREBALL_START_TOP_POS_MARGIN,
  PLANE_MAX_MOVE_AMOUNT,
  PLANE_MOVE_AMOUNT,
} from "utils/settings";

let debouncedShooting: DebouncedFunc<() => void> | null = null;

export const handleShooting = (
  plane: HTMLImageElement,
  createFireball: Function,
  soundManager: ISoundManager
): void => {
  //prevents continous shooting by debouncing it 100ms
  if (!debouncedShooting) {
    debouncedShooting = debounce(() => {
      const planeCoords = plane?.getBoundingClientRect();
      const left = (planeCoords?.right || 0) - FIREBALL_START_LEFT_POS_MARGIN;
      const top = (planeCoords?.top || 0) + FIREBALL_START_TOP_POS_MARGIN;
      createFireball(left, top);
      playSound(soundManager.scoreSoundControls);
    }, 100);
  }
  debouncedShooting();
};

export const handlePlaneMove = (
  plane: HTMLImageElement,
  board: HTMLDivElement,
  movingDirection: Direction,
  level: number,
  toggleDirection: Function
): void => {
  if (!plane || !board) return;

  const planeCoords = plane.getBoundingClientRect();
  const containerCoords = board.getBoundingClientRect();
  const containerBorderWidth = 10;

  const isTouchingLeftWall =
    planeCoords.right >= containerCoords.right - containerBorderWidth;
  const isTouchingRightWall =
    planeCoords.left <= containerCoords.left + containerBorderWidth;

  if (isTouchingLeftWall || isTouchingRightWall) {
    //bounce from the wall
    plane.style.left =
      planeCoords.left + (isTouchingLeftWall ? -10 : +10) + "px";
    toggleDirection();
  } else {
    const moveAmount = Math.min(
      PLANE_MOVE_AMOUNT * level * 2,
      PLANE_MAX_MOVE_AMOUNT
    );
    const incrementer =
      movingDirection === Direction.Left ? -moveAmount : +moveAmount;
    plane.style.left = planeCoords.left + incrementer + "px";
  }
};
