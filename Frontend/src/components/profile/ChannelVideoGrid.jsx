import VideoGrid from "../video/VideoGrid";
const ChannelVideoGrid = ({videos}) => {
  
  return (
    <div className="mt-6">
      <VideoGrid videos={videos} />
    </div>
  );
};

export default ChannelVideoGrid;
