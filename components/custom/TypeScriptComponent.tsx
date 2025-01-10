"use client"

import React, { useState } from 'react'
import UserComponent from './UserComponent'
import { Admin, User } from '@/types/User'

const admin: Admin = {
    name: 'Admin',
    age: 30,
    email: 'admin@example.com',
    role: 'admin'
}

const TypeScriptComponent = () => {
    const [user, setUser] = useState<User>({
        name: 'John Doe',
        age: 20,
        email: 'john@example.com'
    })

    const handleUserUpdate = (field: keyof User, value: string | number) => {
        setUser(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
                    User Profile Management
                </h1>
                <div className="mb-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit User Details</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter name"
                                value={user.name}
                                onChange={(e) => handleUserUpdate('name', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                                Age
                            </label>
                            <input
                                id="age"
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter age"
                                value={user.age}
                                onChange={(e) => handleUserUpdate('age', parseInt(e.target.value) || 0)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter email"
                                value={user.email}
                                onChange={(e) => handleUserUpdate('email', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <UserComponent {...user} />
                    <UserComponent {...admin} />
                </div>
            </div>
        </div>
    )
}

export default TypeScriptComponent
