import VideoGrid from "../video/VideoGrid";
import { videos } from "../../data/video";
const ChannelVideoGrid = () => {
  
  return (
    <div className="mt-6">
      <VideoGrid videos={videos} />
    </div>
  );
};

export default ChannelVideoGrid;
