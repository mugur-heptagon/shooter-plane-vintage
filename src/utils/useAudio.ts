import useSound from "use-sound";
import { HowlOptions } from "howler";

export const useAudio = (sound: unknown, loop: boolean): Function[] => {
  const [play, { stop }] = useSound<HowlOptions>(sound as string, {
    src: sound as string,
    volume: 0.1,
    loop,
  });
  return [play as Function, stop as Function];
};
