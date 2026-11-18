import { Composition } from "remotion";
import { RenderTest } from "./tests/RenderTest";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Workflow check only. Not lesson content. */}
      <Composition
        id="RenderTest"
        component={RenderTest}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
