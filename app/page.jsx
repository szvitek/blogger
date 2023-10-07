'use client';

import BlogCard from '@/components/cards/BlogCard';
import { useState, useEffect, useContext } from 'react';
import PostContext from '../context/PostContext';
import axios from 'axios';
import Tag from '@/components/cards/Tag';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState(null);
  const { setPosts: postContextFunc } = useContext(PostContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/posts');
        setPosts(data);
        postContextFunc(data);
      } catch (error) {
        setError('Error fetching posts');
      }
    };

    fetchData();
  }, []);

  if (posts?.length === 0) {
    return <div className="text-center">No posts found...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-3xl mt-10">
        <img
          src="https://images.unsplash.com/photo-1623018035782-b269248df916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="error"
          className="w-96 h-96 object-cover"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen p-10 lg:p-20">
      <h2 className="text-center text-3xl md:text-4xl lg:5xl font-bold mb-10 flex flex-col justify-center items-center uppercase tracking-widest h-96">
        <span className="text-5xl border-b-4 pg-3 font-bold">My Blog</span>
        <p className="text-lg mt-10">
          Like, share and subscribe for more content!
        </p>
      </h2>
      <h2 className="flex flex-wrap mt-10 gap-4">
        {[...new Set(posts?.map((post) => post.tag))].map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            isSelected={selectedTags.includes(tag)}
            setSelectedTags={setSelectedTags}
          />
        ))}
        {selectedTags?.length !== 0 && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => setSelectedTags([])}
          >
            Clear
          </button>
        )}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {selectedTags?.length !== 0 &&
          posts
            ?.filter((post) => selectedTags.includes(post.tag))
            .map((post) => (
              <BlogCard
                key={post.id}
                tag={post.tag}
                title={post.title}
                desc={post.subheading}
                image={post.img}
              />
            ))}
        {selectedTags?.length === 0 &&
          posts.map((post) => (
            <BlogCard
              key={post._id}
              tag={post.tag}
              title={post.title}
              desc={post.subheading}
              image={post.img}
            />
          ))}
      </div>
    </main>
  );
}
