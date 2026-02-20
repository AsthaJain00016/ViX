const ChannelBanner = ({ coverImage }) => {
  return (
    <>
      {
        !coverImage ? (
        <div className="h-48 w-full rounded-lg bg-linear-to-r from-pink-500 via-purple-500 to-cyan-400" />) :
          (
             <div className="relative h-56 md:h-72 w-full overflow-hidden rounded-2xl">
              <img
            src={coverImage}
            alt="coverImage"
            className="h-full object-cover w-full "
          />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>
          )
      }
    </>

  );
};

export default ChannelBanner;
