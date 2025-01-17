'use client'

import React, { useEffect, useState } from 'react'
import { Card, Text, Heading, Container, Flex, Spinner, Box } from '@radix-ui/themes'

interface Post {
  id: number
  title: string 
  body: string
}

const fetchData = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Post[] = await response.json();
    return data;
}

const NewReactFeatureComponent = () => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const posts = await fetchData();
                setData(posts);
            } catch (error) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="large" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Text color="red" size="3">{error}</Text>
            </Box>
        );
    }

    return (
        <Container size="3" padding="4">
            <Heading size="5" mb="4" textAlign="center">Posts</Heading>
            <Flex direction="column" gap="4">
                {data.map((item: Post) => (
                    <Card key={item.id} size="3" padding="4" borderColor="gray" borderWidth="1px" borderRadius="md">
                        <Heading size="4" mb="2">{item.title}</Heading>
                        <Text size="2" color="gray">{item.body}</Text>
                    </Card>
                ))}
            </Flex>
        </Container>
    )
}

export default NewReactFeatureComponent
