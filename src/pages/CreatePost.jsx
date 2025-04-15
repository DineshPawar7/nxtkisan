import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [type, setType] = useState('text');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();

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
    navigate('/');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Create Post</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <select onChange={(e) => setType(e.target.value)} className='border p-2 rounded'>
          <option value='text'>Article</option>
          <option value='photo'>Photo</option>
          <option value='video'>Video</option>
        </select>
        <textarea
          placeholder='Enter content...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='border p-2 w-full rounded'
        ></textarea>
        <input type='file' onChange={(e) => setMedia(e.target.files[0])} className='block' />
        <button className='bg-blue-500 text-white px-4 py-2 rounded'>Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;