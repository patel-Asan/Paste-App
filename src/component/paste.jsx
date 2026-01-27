import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/paste";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchterm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelet(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Your Pastes
          </h2>
          <p className="text-gray-500 mt-1">
            Search, edit, share, and manage your pastes
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="search"
            placeholder="🔍 Search pastes..."
            value={searchTerm}
            onChange={(e) => setSearchterm(e.target.value)}
            className="w-full p-4 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Paste Cards */}
        {filterData.length > 0 ? (
          <div className="grid gap-6">
            {filterData.map((paste) => (
              <div
                key={paste.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                {/* Title */}
                <h3 className="text-2xl font-semibold text-gray-800 truncate">
                  {paste.title}
                </h3>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-5">
                  <Link to={`/?pasteId=${paste?.id}`}>
                    <button className="btn-blue">Edit</button>
                  </Link>

                  <Link to={`/pastes/${paste._id}`}>
                    <button className="btn-indigo">View</button>
                  </Link>

                  <button
                    onClick={() => handleDelet(paste?._id)}
                    className="btn-red"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="btn-dark"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/?pasteId=${paste?.id}`;
                      navigator.clipboard.writeText(url);
                      toast.success("Paste URL copied");
                    }}
                    className="btn-green"
                  >
                    Share
                  </button>
                </div>

                {/* Content Preview */}
                <p className="mt-5 text-gray-700 whitespace-pre-wrap line-clamp-4 leading-relaxed">
                  {paste.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No pastes found 😕</p>
            <p className="text-sm mt-1">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Paste;
