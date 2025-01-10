import React from 'react'
import { User } from '@/types/User'

const UserComponent: React.FC<User> = ({ name, age, email }) => {

    return (
        <div>
            <h1>{name}</h1>
            <h1>{age}</h1>
            <h1>{email}</h1>
        </div>
    )
}

export default UserComponent
