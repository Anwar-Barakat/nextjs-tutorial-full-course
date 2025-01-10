import React from 'react'
import { Admin, User } from '@/types/User'

const UserComponent: React.FC<User | Admin> = (props) => {
    // Type guard to check if the user is an admin
    const isAdmin = (user: User | Admin): user is Admin => {
        return 'role' in user;
    }

    const { name, age, email } = props;

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <span className="text-gray-500 min-w-[5rem] font-medium">Name:</span>
                    <h2 className="text-xl font-semibold text-gray-800 tracking-wide">{name}</h2>
                </div>

                <div className="flex items-center space-x-3">
                    <span className="text-gray-500 min-w-[5rem] font-medium">Age:</span>
                    <p className="text-gray-700 font-medium">{age} years old</p>
                </div>

                <div className="flex items-center space-x-3">
                    <span className="text-gray-500 min-w-[5rem] font-medium">Email:</span>
                    <a href={`mailto:${email}`} className="text-blue-600 hover:underline hover:text-blue-800 transition-colors duration-200">
                        {email}
                    </a>
                </div>

                {isAdmin(props) && (
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-500 min-w-[5rem] font-medium">Role:</span>
                        <span className="px-4 py-1.5 text-sm font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-sm">
                            {props.role}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserComponent
