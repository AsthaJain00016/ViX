import { useCallback, useEffect } from "react";
import { useState } from "react";
import { addComment, fetchAllComments, deleteComment } from "../../api/comment.api";
import formatRelativeTime from "../common/TimeUtils";

const Comments = ({ video }) => {
  const [commentCount, setCommentCount] = useState(video?.commentCount || 0);
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [commenting, setCommenting] = useState(false)

  useEffect(() => {
    loadComments();
  }, [video._id]);

  const loadComments = async () => {
    try {
      const comments = await fetchAllComments(video._id);
      setComments(comments || []);
      setCommentCount(comments?.length || 0);
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  };

  const handleComment = useCallback(async () => {
    if (!newComment.trim()) return;
    setCommenting(true);
    try {
      const newCommentData = await addComment(video._id, { content: newComment })
      setNewComment("")
      setComments((prev) => {
        return [newCommentData, ...prev]
      })
      setCommentCount(prev => prev + 1)
    } catch (error) {
      console.error("Failed to add comment", error)
    } finally {
      setCommenting(false)
    }
  }, [video._id, newComment])

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c._id !== commentId));
      setCommentCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }
  return (
    <div className="mt-6 text-white">
      <div className="flex items-center gap-2 p-3 bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-xl shadow-sm mb-4">
        <h2 className="text-xl font-semibold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {commentCount} Comments
        </h2>
      </div>

      {/* Add comment */}
      <div className="flex w-full bg-neutral-900/70 border border-white/5 rounded-2xl px-5 py-4 text-sm backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button
          onClick={handleComment}
          disabled={commenting || !newComment.trim()}
          className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {commenting ? "..." : "Comment"}
        </button>
      </div>


      {/* Comments */}
      <div className="mt-4 space-y-3">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div 
              key={comment._id}
              className="group relative bg-neutral-900/50 border border-white/5 rounded-xl p-4 backdrop-blur-md shadow-sm hover:shadow-lg hover:bg-neutral-900/70 hover:scale-[1.01] transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-start gap-3">
                <img
                  src={comment.owner?.avatar || "https://i.pravatar.cc/150?img=32"}
                  alt="Commenter"
                  className="w-10 h-10 rounded-full ring-2 ring-white/20 group-hover:ring-purple-500/50 transition-all duration-300 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors cursor-pointer line-clamp-1">
                      {comment.owner?.username || "Anonymous"}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-200 leading-relaxed line-clamp-3 mb-4">
                    {comment.content}
                  </p>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-end gap-2 ml-auto">
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="px-3 py-1.5 bg-red-500/90 hover:bg-red-600 text-white text-xs rounded-full shadow-md shadow-red-500/25 hover:shadow-lg hover:scale-105 font-medium transition-all duration-300 whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 rounded-xl bg-neutral-900/30 border border-dashed border-white/10">
            <p className="text-sm">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Comments;
