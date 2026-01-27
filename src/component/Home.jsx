import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPaste } from "../redux/paste";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const allPastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  // Prefill data when editing
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p.id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      id: pasteId || Date.now().toString(36),
      title,
      content: value,
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {pasteId ? "Edit Your Paste" : "Create a New Paste"}
        </h1>

        {/* Title + Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={createPaste}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition
              ${
                pasteId
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          value={value}
          placeholder="Enter your content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={18}
        />
      </div>
    </div>
  );
}

export default Home;
