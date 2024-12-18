import Image from "next/image";
import Video from "next-video";
import getStarted from "../../videos/get-started.mp4";
import thoughtnet_intro from "../../videos/TNS_AnimatedInfographic_DidYouKnow.mp4";
export default function HomePage() {
  return (
    <>
      <div className="flex justify-center p-3">
        <div>
          <h1>Welcome to Conscious Cog: A blog for software developers!</h1>
        </div>
      </div>
      <div className="flex justify-center ">
        {" "}
        <Video src={getStarted} />
        <Video src={thoughtnet_intro} />
      </div>
      <div className="flex justify-center p-3 text-xl">
        News: *News Component*
      </div>
    </>
  );
}
