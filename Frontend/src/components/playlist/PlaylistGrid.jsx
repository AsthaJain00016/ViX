import PlaylistCard from "./PlaylistCard";
const PlaylistGrid = ({ playlists }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistGrid;
