const SearchVideoCard=({video})=>{
    return(
        <div className="flex gap-4 p-3 hover:bg-neutral-900 rounded-lg cursor-pointer transition duration-200">
            <div className="relative w-90 min-w-90">
                <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-50 object-cover rounded-lg transition-transform duration-300
            group-hover:scale-105"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-0.5 rounded  backdrop-blur">
                    {video.duration}
                </span>
            </div>

            <div className="flex flex-col gap-2 text-sm flex-1">
                <h3 className="text-base font-semibold line-clamp-2 hover:text-purple-400
            transition">
                    {video.title}
                </h3>
                <p className="text-gray-400 text-xs">
                    {video.views} . {video.time}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <img
                    src={video.channel.avatar}
                    className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-300 hover:text-white transition"> {video.channel.name} </span>
                </div>

                <p className="text-gray-400 line-clamp-2 mt-1"> {video.description} </p>
            </div>
        </div>
    )
}

export default SearchVideoCard;