'use client'

import useFetch from '@/hooks/use-fetch';
import React, { useEffect, useState, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Post {
    id: number;
    title: string;
    body: string;
}

const CustomHookComponent = () => {
    const { data, loading, error, fetchData } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    }, []);

    const filteredPosts = data?.filter(post => 
        post.title.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4">
            <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-2xl font-bold text-gray-800">Posts</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full"
                        />
                    </div>

                    {loading && (
                        <div className="flex justify-center">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    {error && (
                        <div className="text-center text-red-500">
                            <p>Error: {error.message}</p>
                            <Button 
                                onClick={fetchData}
                                className="mt-2"
                                variant="outline"
                            >
                                Retry
                            </Button>
                        </div>
                    )}
                    {filteredPosts && (
                        <div className="space-y-2">
                            {filteredPosts.length === 0 ? (
                                <p className="text-center text-gray-500">No posts found</p>
                            ) : (
                                filteredPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                        onClick={() => setSelectedPost(selectedPost?.id === post.id ? null : post)}
                                    >
                                        <h3 className="font-medium">{post.title}</h3>
                                        {selectedPost?.id === post.id && (
                                            <p className="mt-2 text-sm text-gray-600">{post.body}</p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default CustomHookComponent
