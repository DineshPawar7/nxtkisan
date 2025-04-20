import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import FeedHeader from './FeedHeader';
import ProfileInfo from './ProfileInfo';
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { BiRepost } from "react-icons/bi";

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

    return () => {
      socket.off('new_post');
    };
  }, []);

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-4 md:px-10 lg:px-20">
      <FeedHeader />
      
      {posts.map((post) => {
        console.log(post);
        return (
          <div key={post._id} className="bg-white p-4 mb-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 pb-2">
              <div>
                <ProfileInfo 
                  userImage={post.userImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                  username={post.username || "Anonymous"} 
                />
              </div>
            </div>

            <div className="text-base leading-relaxed text-[#1d1d1f] py-2 break-words whitespace-pre-line font-sans">
              {post.content?.split('\n').map((para, i) => (
                <p key={i} className="mb-2 py-1">
                  {para}
                </p>
              ))}
            </div>

            {post.media && (
              <img
                src={`http://localhost:5000${post.media}`}
                alt="Post"
                className="w-full rounded-lg mt-2"
              />
            )}

            <div className="flex gap-4 py-2 text-xl text-gray-800">
              <button className={post.liked ? 'text-red-500' : ''}><AiOutlineLike /></button>
              <button><MdOutlineInsertComment /></button>
              <button><BiRepost /></button>
            </div>

            <p className="font-bold mt-1">{post.likes || 0} likes</p>

            <p className="text-sm text-gray-800 pt-1">{post.caption}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
