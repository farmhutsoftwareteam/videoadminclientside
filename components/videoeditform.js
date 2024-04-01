import React, { useState } from "react";

const VideoEditForm = ({ video, onSave, onCancel }) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description || "");
  const [tags, setTags] = useState(video.tags.join(", "));
  const [category, setCategory] = useState(video.category || "");
  const [monetization, setMonetization] = useState(video.monetization.type !== 'free');
  const [isLoading, setIsLoading] = useState(false); // Loading state


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");
    setIsLoading(true); // Start loading

    const editedVideo = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      category,
      monetization: { type: monetization ? 'pay-per-view' : 'free' },
    };

    try {
      await onSave(editedVideo); // Assuming onSave performs the actual save operation
      setIsLoading(false); // Stop loading on success
    } catch (error) {
      console.error("Error saving video:", error);
      setIsLoading(false); // Stop loading on error
    }
  };


  return (
    <div className="flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-5">
        <div className="mb-5">
          <label htmlFor="title" className="block text-lg font-medium text-white">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-white border-2 shadow-sm text-lg p-3 bg-black text-white"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block text-lg font-medium text-white">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md bg-transparent border-2  border-gray-300 shadow-sm text-lg p-3 h-32"
            disabled={isLoading}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="tags" className="block text-lg font-medium text-white">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block bg-transparent border w-full rounded-md border-gray-300 shadow-sm text-lg p-3"
            disabled={isLoading}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="category" className="block text-lg font-medium text-white">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md bg-transparent border-2 border-gray-300 shadow-sm text-lg p-3"
            disabled={isLoading}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="monetization" className="block text-lg font-medium text-white">Monetization</label>
          <div className="mt-2">
            <input
              type="checkbox"
              id="monetization"
              checked={monetization}
              onChange={(e) => setMonetization(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">Enable monetization</span>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md shadow"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow"
          >
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
};

export default VideoEditForm;
