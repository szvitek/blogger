'use client';

import axios from 'axios';

const { createContext, useState, useContext, useEffect } = require('react');

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
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

    fetchData();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        post,
        setPost,
        error,
        setError,
        selectedTags,
        setSelectedTags,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};

export { PostContext, PostProvider };
