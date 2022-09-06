import { FC } from "react";
import Scene from "components/scene/Scene";
import ScoreBoard from "components/info/score-board/ScoreBoard";
import Header from "components/header/Header";
import Clock from "components/info/clock/Clock";
import Health from "components/info/health/Health";

const App: FC = () => {
  return (
    <>
      <Header />
      <Scene />
      <Health />
      <Clock />
      <ScoreBoard />
    </>
  );
};

export default App;
