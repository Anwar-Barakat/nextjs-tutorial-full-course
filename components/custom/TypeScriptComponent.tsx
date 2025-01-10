import React from 'react'
import UserComponent from './UserComponent'
import { User } from '@/types/User'

const user: User = {
    name: 'John Doe',
    age: 20,
    email: 'john@example.com'
}
const TypeScriptComponent = () => {

    return (
        <div>
            <UserComponent name={user.name} age={user.age} email={user.email} />
        </div>
    )
}

export default TypeScriptComponent
