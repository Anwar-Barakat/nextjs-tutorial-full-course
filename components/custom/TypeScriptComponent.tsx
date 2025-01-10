import React from 'react'
import UserComponent from './UserComponent'
import { Admin, User } from '@/types/User'

const user: User = {
    name: 'John Doe',
    age: 20,
    email: 'john@example.com'
}

const admin: Admin = {
    name: 'Admin',
    age: 30,
    email: 'admin@example.com',
    role: 'admin'
}

const TypeScriptComponent = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
                    User Profiles
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <UserComponent {...user} />
                    <UserComponent {...admin} />
                </div>
            </div>
        </div>
    )
}

export default TypeScriptComponent
