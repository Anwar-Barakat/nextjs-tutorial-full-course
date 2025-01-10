'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Person {
    name: string;
    age: number;
    email: string;
}

const TypescriptExample = () => {
    const [person, setPerson] = useState<Person>({
        name: 'John',
        age: 30,
        email: 'john@example.com'
    })

    const handleChange = (field: keyof Person, value: string | number) => {
        setPerson(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Person Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={person.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                value={person.age}
                                onChange={(e) => handleChange('age', parseInt(e.target.value))}
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={person.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </div>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-lg">Current Values</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-2"><span className="font-semibold">Name:</span> {person.name}</p>
                                <p className="mb-2"><span className="font-semibold">Age:</span> {person.age}</p>
                                <p><span className="font-semibold">Email:</span> {person.email}</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default TypescriptExample
