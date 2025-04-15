import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then((res) => res.json())
      .then(setPosts);

    socket.on('new_post', (post) => {
      setPosts((prev) => [post, ...prev]);
    });
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Feed</h1>
      {posts.map((post) => (
        <div key={post._id} className='border p-4 mb-4 rounded shadow'>
          <p>Type: {post.type}</p>
          <p>{post.content}</p>
          {post.media && <img src={`http://localhost:5000${post.media}`} className='max-w-xs mt-2' />}
        </div>
      ))}
    </div>
  );
}

export default Feed;
