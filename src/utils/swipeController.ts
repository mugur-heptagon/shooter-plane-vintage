import { Direction } from "types";

export class SwipeController {
  private swipedir: string = "none";
  private startX: number = 0;
  private startY: number = 0;
  private distX: number = 0;
  private distY: number = 0;
  private threshold: number = 50; //required min distance traveled to be considered swipe
  private restraint: number = 100; // maximum distance allowed at the same time in perpendicular direction
  private allowedTime: number = 300; // maximum time allowed to travel that distance
  private elapsedTime: number = 0;
  private startTime: number = 0;
  private callback: Function;

  constructor(_callback: Function) {
    this.callback = _callback;
  }

  private onTouchStart = (e: any) => {
    var touchobj = e.changedTouches[0];
    this.swipedir = "none";
    this.startX = touchobj.pageX;
    this.startY = touchobj.pageY;
    this.startTime = new Date().getTime(); // record time when finger first makes contact with surface
    //e.preventDefault();
  };

  private onTouchMove = (e: any) => {
    //e.preventDefault(); // prevent scrolling when inside DIV
  };

  private onTouchEnd = (e: any) => {
    var touchobj = e.changedTouches[0];
    this.distX = touchobj.pageX - this.startX; // get horizontal dist traveled by finger while in contact with surface
    this.distY = touchobj.pageY - this.startY; // get vertical dist traveled by finger while in contact with surface
    this.elapsedTime = new Date().getTime() - this.startTime; // get time elapsed
    if (this.elapsedTime <= this.allowedTime) {
      // first condition for awipe met
      if (
        Math.abs(this.distX) >= this.threshold &&
        Math.abs(this.distY) <= this.restraint
      ) {
        // 2nd condition for horizontal swipe met
        this.swipedir = this.distX < 0 ? Direction.Left : Direction.Right; // if dist traveled is negative, it indicates left swipe
      } else if (
        Math.abs(this.distY) >= this.threshold &&
        Math.abs(this.distX) <= this.restraint
      ) {
        // 2nd condition for vertical swipe met
        this.swipedir = this.distY < 0 ? Direction.Up : Direction.Down; // if dist traveled is negative, it indicates up swipe
      }
    }
    this.callback(this.swipedir);
    //e.preventDefault();
  };

  public addSwipeListeners = () => {
    document.addEventListener("touchstart", this.onTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", this.onTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", this.onTouchEnd, { passive: false });
  };

  public removeSwipeListeners = () => {
    document.removeEventListener("touchstart", this.onTouchStart);
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onTouchEnd);
  };
}

export default SwipeController;
