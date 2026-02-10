import { useState } from "react";
import Layout from "../components/Layout/Layout";

const faqs = [
  {
    q: "Why is my playlist not loading?",
    a: "This can happen due to network issues or if the playlist was deleted. Please refresh or try again later."
  },
  {
    q: "Why does the screen turn white sometimes?",
    a: "This usually happens due to an unhandled error in the frontend. We recommend refreshing the page."
  },
  {
    q: "Why am I seeing 'Please login'?",
    a: "You are not authenticated or your session expired. Please login again."
  },
  {
    q: "How do I change my avatar or password?",
    a: "Go to Settings → Change Avatar / Change Password."
  }
];

const Support= () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({
    subject: "",
    category: "General",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support request submitted (demo)");
    setForm({ subject: "", category: "General", message: "" });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 text-white">

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6">Support</h1>

        {/* Help Center */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Help Center</h2>

          <div className="space-y-3">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full text-left px-4 py-3 flex justify-between items-center"
                >
                  <span>{item.q}</span>
                  <span>{openFaq === index ? "−" : "+"}</span>
                </button>

                {openFaq === index && (
                  <div className="px-4 pb-3 text-gray-400">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Contact Support</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-[#111] p-6 rounded-xl border border-gray-800"
          >
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
              required
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
            >
              <option>General</option>
              <option>Account</option>
              <option>Videos</option>
              <option>Playlists</option>
              <option>Bug Report</option>
            </select>

            <textarea
              placeholder="Describe your issue..."
              rows="4"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
              required
            />

            <button
              type="submit"
              className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700"
            >
              Submit
            </button>
          </form>
        </section>

        {/* Report Bug */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Report a Bug</h2>
          <p className="text-gray-400">
            Found something broken? Please report it using the contact form and select
            <strong> “Bug Report”</strong>.
          </p>
        </section>

        {/* About Project */}
        <section className="border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-2">About This Project</h2>
          <p className="text-gray-400">
            This platform is a video and tweet sharing application developed as a
            <strong> Final Year BSc Computer Science Project</strong> using the MERN stack.
            It includes authentication, profile management, playlists, tweets, and videos.
          </p>
        </section>

      </div>
    </Layout>
  );
};

export default Support;
