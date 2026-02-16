const ChannelBanner = ({ coverImage }) => {
  return (
    <>
      {
        !coverImage ? (<div className="h-48 w-full rounded-lg bg-linear-to-r from-pink-500 via-purple-500 to-cyan-400" />) :
          (<img
            src={coverImage}
            alt="coverImage"
            className="h-48 w-full rounded-lg"
          />)
      }
    </>

  );
};

export default ChannelBanner;
