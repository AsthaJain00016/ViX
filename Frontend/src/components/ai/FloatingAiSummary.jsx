import { useState, useEffect } from "react";
import { getVideoOverview } from "../../api/ai.api";
import { X } from "lucide-react";

const FloatingAISummary = ({ videoId }) => {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===============================
     🧠 FETCH SUMMARY
  =============================== */

  const fetchSummary = async () => {
    if (loading || summary) return;

    setLoading(true);
    try {
      const res = await getVideoOverview(videoId);
      console.log("SUMMARY RESPONSE:", res)
      setSummary(res?.data.overview || "No overview generated");
    } catch (err) {
        console.error("SUMMARY ERROR:", err);
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     ✨ STREAMING TYPE EFFECT
  =============================== */

  useEffect(() => {
    if (!summary) return;

    let i = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText(summary.slice(0, i));
      i++;
      if (i > summary.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [summary]);

  /* ===============================
     🎨 UI
  =============================== */

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => {
          setOpen(true);
          fetchSummary();
        }}
        className="fixed bottom-9 right-18 z-50 
        bg-linear-to-r from-purple-600 to-blue-600
        hover:scale-110 transition
        shadow-lg shadow-purple-500/30
        text-white px-5 py-3 rounded-full font-medium"
      >
        🤖 AI Summary
      </button>

      {/* Floating Panel */}
      {open && (
        <div className="fixed bottom-24 right-8 w-95 
        bg-white/5 backdrop-blur-xl 
        border border-white/10
        rounded-2xl shadow-2xl
        animate-fadeIn
        z-50 overflow-hidden">

          {/* Animated Gradient Border */}
          <div className="absolute inset-0 rounded-2xl p-px 
            bg-linear-to-r from-purple-500 via-blue-500 to-purple-500 
            opacity-30 animate-spin-slow">
          </div>

          <div className="relative p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">
                🤖 AI Video Summary
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="text-sm text-white leading-relaxed font-medium tracking-wide max-h-72 overflow-y-auto pr-2">

              {loading ? (
                <div className="animate-pulse text-purple-400">
                  Analyzing video...
                </div>
              ) : (
                displayedText
              )}

            </div>

            {/* Refresh */}
            {!loading && (
              <button
                onClick={() => {
                  setSummary("");
                  fetchSummary();
                }}
                className="mt-4 text-xs text-purple-400 hover:text-purple-300"
              >
                🔄 Regenerate
              </button>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAISummary;
