import { Direction } from "@mui/material";
import { useEffect, useRef } from "react";
import SwipeController from "./swipeController";

const useEventListeners = (onKeyDown: any): void => {
  const swipeControllerRef = useRef<SwipeController>();

  useEffect(() => {
    const swipeToKeyboardEventMapper = (direction: Direction): void => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: direction as Direction })
      );
    };

    const resizeHandler = () => {
      window.location.reload();
    };

    if (swipeControllerRef) {
      swipeControllerRef.current = new SwipeController(
        swipeToKeyboardEventMapper
      );
    }

    window.addEventListener("resize", resizeHandler);
    document.addEventListener("keydown", onKeyDown);
    swipeControllerRef.current?.addSwipeListeners();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("keydown", onKeyDown);
      swipeControllerRef.current?.removeSwipeListeners();
    };
  }, [onKeyDown]);
};

export default useEventListeners;
