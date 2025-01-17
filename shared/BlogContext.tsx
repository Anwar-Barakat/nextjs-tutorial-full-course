"use client";

import { Blog } from "@/types/Blog";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, "id">) => void;
  removeBlog: (id: number) => void;
  updateBlog: (id: number, updatedBlog: Partial<Omit<Blog, "id">>) => void;
}

const BlogContext = createContext<BlogContextType>({
  blogs: [],
  addBlog: () => { },
  removeBlog: () => { },
  updateBlog: () => { },
});

interface BlogProviderProps {
  children: ReactNode;
  initialBlogs?: Blog[];
}

export const BlogProvider = ({
  children,
  initialBlogs = [],
}: BlogProviderProps) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  const addBlog = useCallback((blog: Omit<Blog, "id">) => {
    setBlogs((prevBlogs) => {
      const maxId = prevBlogs.reduce((max, b) => Math.max(max, b.id), 0);
      const newBlog = {
        ...blog,
        id: maxId + 1,
      };
      return [...prevBlogs, newBlog];
    });
  }, []);

  const removeBlog = useCallback((id: number) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  }, []);

  const updateBlog = useCallback(
    (id: number, updatedBlog: Partial<Omit<Blog, "id">>) => {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id
            ? {
              ...blog,
              ...updatedBlog,
            }
            : blog
        )
      );
    },
    []
  );

  return (
    <BlogContext.Provider value={{ blogs, addBlog, removeBlog, updateBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }

  return context;
};

export const useBlog = (id: number) => {
  const { blogs, updateBlog, removeBlog } = useBlogs();

  const blog = useMemo(() => blogs.find((b) => b.id === id), [blogs, id]);

  const updateCurrentBlog = useCallback(
    (updates: Partial<Omit<Blog, "id">>) => {
      updateBlog(id, updates);
    },
    [id, updateBlog]
  );

  const removeCurrentBlog = useCallback(() => {
    removeBlog(id);
  }, [id, removeBlog]);

  return {
    blog,
    updateBlog: updateCurrentBlog,
    removeBlog: removeCurrentBlog,
  };
};

export default BlogProvider;