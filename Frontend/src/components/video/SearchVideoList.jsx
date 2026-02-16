import SearchVideoCard from "./SearchVideoCard"

const SearchVideoList = ({ videos }) => {
    return (
        <div className="flex flex-col gap-2">
            {
                videos.map((video) => (
                    <SearchVideoCard key={video._id} video={video} />
                ))
            }
        </div>
    )
}

export default SearchVideoList