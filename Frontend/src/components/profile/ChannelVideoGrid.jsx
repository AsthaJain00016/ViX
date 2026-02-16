import { useState } from "react";
import VideoGrid from "../video/VideoGrid";
import TitleGenerator from "../ai/TitleGenerator";
import { publishVideo } from "../../api/video.api";

const ChannelVideoGrid = ({ videos, loading, isOwner = false, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [topic, setTopic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !title || !description) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      setSubmitting(true);
      await publishVideo(formData);
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnail(null);
      setShowForm(false);
      if (onRefresh) await onRefresh();
    } catch (err) {
      console.error("Upload failed", err?.response || err);
      alert("Upload failed: " + (err?.response?.data?.message || err?.message || "See console"))
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      {isOwner && (
        <div className="mb-4">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="px-4 py-2 bg-purple-600 rounded text-white"
          >
            {showForm ? "Cancel" : "Upload Video"}
          </button>
          {showForm && (
            <form onSubmit={handleSubmit} className="mt-3 p-4 bg-gray-800 rounded">
              <div className="flex gap-2 mb-2 items-end">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 p-2 bg-gray-900 text-white rounded"
                />
                <TitleGenerator
                  topic={title || topic}
                  onSelectTitle={(selectedTitle) => setTitle(selectedTitle)}
                />
              </div>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-2 p-2 bg-gray-900 text-white rounded"
              />
              <div className="flex gap-2">
                <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
                <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
              </div>
              <div className="mt-3">
                <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white" disabled={submitting}>
                  {submitting ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <VideoGrid videos={videos} loading={loading} isOwner={isOwner} onRefresh={onRefresh} />
    </div>
  );
};

export default ChannelVideoGrid;
