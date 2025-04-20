import React, { useState, useEffect } from 'react';

function CreatePost({ type, closeModal }) {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);

  useEffect(() => {
    setContent('');
    setMedia(null);
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', type);
    formData.append('content', content);
    if (media) formData.append('media', media);

    await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      body: formData,
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 capitalize">Create {type}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Enter content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full rounded"
          ></textarea>
          <input
            type="file"
            onChange={(e) => setMedia(e.target.files[0])}
            className="block"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
