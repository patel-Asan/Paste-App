import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Viewpaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes?.find((p) => String(p._id) === String(id));

  // ⛔ Safety Guard
  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-500">
          Paste not found or loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          View Paste
        </h2>

        {/* Title */}
        <input
          className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 font-medium mb-6"
          type="text"
          value={paste.title}
          disabled
        />

        {/* Content */}
        <textarea
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-800 resize-none"
          value={paste.content}
          rows={20}
          disabled
        />
      </div>
    </div>
  );
}

export default Viewpaste;
