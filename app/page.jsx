'use client';

import BlogCard from '@/components/cards/BlogCard';
import { useState, useEffect, useContext } from 'react';
import PostContext from '../context/PostContext';
import axios from 'axios';
import Tag from '@/components/cards/Tag';

export default function Home() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'How to use React',
      subheading: 'React is a great framework',
      image: 'https://picsum.photos/200/300',
      tag: 'React',
    },
    {
      id: 2,
      title: 'How to use React2',
      subheading: 'React is a great framework',
      image: 'https://picsum.photos/200/300',
      tag: 'React',
    },
    {
      id: 3,
      title: 'How to use React3',
      subheading: 'React is a great framework',
      image: 'https://picsum.photos/200/300',
      tag: 'React',
    },
  ]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/posts');
        setPosts(data);
      } catch (error) {
        setError('Error fetching posts');
      }
    };
  }, []);

  if (posts?.length === 0) {
    return <div className="text-center">No posts found...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-3xl mt-10">
        <img src="#" alt="error" className="w-96" />
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
                image={post.image}
              />
            ))}
        {selectedTags?.length === 0 &&
          posts.map((post) => (
            <BlogCard
              key={post.id}
              tag={post.tag}
              title={post.title}
              desc={post.subheading}
              image={post.image}
            />
          ))}
      </div>
    </main>
  );
}
