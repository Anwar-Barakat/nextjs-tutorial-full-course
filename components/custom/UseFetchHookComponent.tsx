"use client";

import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UseFetchHookComponent = () => {
  const { data, loading, error, fetchData } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPosts = data?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-2xl font-bold text-gray-800">Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-6"
          />

          {loading && (
            <div className="flex justify-center p-8">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 p-4">
              <p>Error: {error.message}</p>
              <Button onClick={fetchData} className="mt-4" variant="outline">
                Retry
              </Button>
            </div>
          )}

          {filteredPosts && (
            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.body}</p>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UseFetchHookComponent;
