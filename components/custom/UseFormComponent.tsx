'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface FormData {
    firstName: string
    lastName: string
    email: string
    city: string
    state: string
    country: string
    completeLocation: string
}

const UseFormComponent = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(data)
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Registration Form</CardTitle>
                    <CardDescription>Fill in your details to register</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                {...register('firstName', { 
                                    required: 'First Name is required',
                                    minLength: { value: 2, message: 'First name must be at least 2 characters' }
                                })} 
                                placeholder='Enter your first name'
                                className={errors.firstName ? "border-destructive" : ""}
                            />
                            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                {...register('lastName', { 
                                    required: 'Last Name is required',
                                    minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                                })} 
                                placeholder='Enter your last name'
                                className={errors.lastName ? "border-destructive" : ""}
                            />
                            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email', { 
                                    required: 'Email is required', 
                                    pattern: { 
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                                        message: 'Invalid email address' 
                                    } 
                                })} 
                                placeholder='Enter your email'
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                {...register('city', { required: 'City is required' })} 
                                placeholder='Enter your city'
                                className={errors.city ? "border-destructive" : ""}
                            />
                            {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                                id="state"
                                {...register('state', { required: 'State is required' })} 
                                placeholder='Enter your state'
                                className={errors.state ? "border-destructive" : ""}
                            />
                            {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                {...register('country', { required: 'Country is required' })} 
                                placeholder='Enter your country'
                                className={errors.country ? "border-destructive" : ""}
                            />
                            {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="completeLocation">Complete Address</Label>
                            <Input
                                id="completeLocation"
                                {...register('completeLocation', { required: 'Complete Location is required' })} 
                                placeholder='Enter your complete address'
                                className={errors.completeLocation ? "border-destructive" : ""}
                            />
                            {errors.completeLocation && <p className="text-sm text-destructive">{errors.completeLocation.message}</p>}
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default UseFormComponent