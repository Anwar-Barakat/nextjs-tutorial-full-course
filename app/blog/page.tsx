import React from 'react'
import { BlogModal, TrendList, UserList } from './_components'
import BlogProvider from '@/shared/BlogContext'

const BlogPage = () => {
    return (
        <BlogProvider>
            <div>
                <BlogModal />
                <UserList />
                <TrendList />

            </div>
        </BlogProvider>
    )
}

export default BlogPage
