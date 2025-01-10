'use client'

import React, { useState } from 'react'
import { postSchema, postValidation } from '@/validations/post-validation'
import { Post } from '@/types/Post'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'   
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ZodFormComponent: React.FC = () => {
    const initialFormState: Post = {
        id: 0,
        title: '',
        content: '',
        author: '',
        created_at: new Date(),
        published_at: new Date(),
    }

    const [formData, setFormData] = useState<Post>(initialFormState)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateField = (field: keyof typeof postValidation.shape, value: unknown) => {
        try {
            postValidation.shape[field].parse(value)
            setErrors(prev => ({ ...prev, [field]: '' }))
        } catch (error) {
            if (error instanceof Error) {
                setErrors(prev => ({ 
                    ...prev, 
                    [field]: error instanceof Error ? error.message : 'Invalid input'
                }))
            }
        }
    }

    const handleChange = (field: keyof typeof postValidation.shape, value: unknown) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        validateField(field, value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const validatedData = postValidation.safeParse(formData)
            
            console.log(validatedData)
            if (validatedData.success) {
                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 1000))
                toast.success('Post submitted successfully!')
                setFormData(initialFormState)
                setErrors({})
            } else {
                const formattedErrors: Record<string, string> = {}
                validatedData.error.errors.forEach(error => {
                    if (error.path[0]) {
                        formattedErrors[error.path[0].toString()] = error.message
                    }
                })
                setErrors(formattedErrors)
                toast.error('Please fix the form errors')
            }
        } catch (error) {
            console.error('Submission error:', error)
            toast.error('An unexpected error occurred')
        }
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Enter post title"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className={`w-full ${errors.title ? 'border-red-500' : ''}`}
                            aria-invalid={!!errors.title}
                        />
                        {errors.title ? (
                            <p className="text-xs text-red-500">{errors.title}</p>
                        ) : (
                            <p className="text-xs text-gray-500">Minimum 3 characters required</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-sm font-medium">Content</Label>
                        <textarea
                            id="content"
                            name="content"
                            placeholder="Enter post content"
                            value={formData.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                            className={`w-full min-h-[150px] p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : ''}`}
                            aria-invalid={!!errors.content}
                        />
                        {errors.content ? (
                            <p className="text-xs text-red-500">{errors.content}</p>
                        ) : (
                            <p className="text-xs text-gray-500">Minimum 10 characters required</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="author" className="text-sm font-medium">Author</Label>
                        <Input
                            id="author"
                            name="author"
                            placeholder="Enter author name"
                            value={formData.author}
                            onChange={(e) => handleChange('author', e.target.value)}
                            className={`w-full ${errors.author ? 'border-red-500' : ''}`}
                            aria-invalid={!!errors.author}
                        />
                        {errors.author ? (
                            <p className="text-xs text-red-500">{errors.author}</p>
                        ) : (
                            <p className="text-xs text-gray-500">Minimum 3 characters required</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="created_at" className="text-sm font-medium">Created At</Label>
                            <Input
                                id="created_at"
                                type="date"
                                name="created_at"
                                value={formData.created_at.toISOString().split('T')[0]}
                                onChange={(e) => handleChange('created_at', new Date(e.target.value))}
                                className={`w-full ${errors.created_at ? 'border-red-500' : ''}`}
                                aria-invalid={!!errors.created_at}
                            />
                            {errors.created_at && (
                                <p className="text-xs text-red-500">{errors.created_at}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="published_at" className="text-sm font-medium">Published At</Label>
                            <Input
                                id="published_at"
                                type="date"
                                name="published_at"
                                value={formData.published_at.toISOString().split('T')[0]}
                                onChange={(e) => handleChange('published_at', new Date(e.target.value))}
                                className={`w-full ${errors.published_at ? 'border-red-500' : ''}`}
                                aria-invalid={!!errors.published_at}
                            />
                            {errors.published_at && (
                                <p className="text-xs text-red-500">{errors.published_at}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                                setFormData(initialFormState)
                                setErrors({})
                            }}
                        >
                            Reset
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Submit Post
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default ZodFormComponent
