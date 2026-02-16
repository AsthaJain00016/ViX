import { useCallback, useEffect } from "react";
import { useState } from "react";
import { addComment, fetchAllComments, deleteComment } from "../../api/comment.api";

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
      <h2 className="text-lg font-semibold mb-3">{commentCount} Comments</h2>

      {/* Add comment */}
      <div className="flex w-full bg-black border border-neutral-700 rounded px-3 py-2 text-sm ">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full border-none text-sm outline-none"
        />
        <button
          onClick={handleComment}
          disabled={commenting || !newComment.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-full"
        >{commenting ? "..." : "Comment"}</button>
      </div>


      {/* Comments */}
      <div className="mt-6 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="flex gap-3 mt-4" key={comment._id}>
              <img
                src={comment.owner?.avatar || "https://i.pravatar.cc/150?img=32"}
                alt="Commenter"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {comment.owner?.username || "Anonymous"} <span className="text-gray-400 text-xs">{comment.createdAt}</span>
                </p>
                <p className="text-gray-300 text-sm">{comment.content}</p>
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="text-xs text-red-500 hover:text-red-400 mt-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No comments yet. Be the first to comment!</p>
        )}
      </div>

    </div>
  );
};

export default Comments;
