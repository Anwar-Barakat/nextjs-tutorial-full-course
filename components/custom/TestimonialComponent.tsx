'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '../ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
    id: number
    name: string
    testimonial: string
    rating?: number
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'John Doe',
        testimonial: 'This is a testimonial',
        rating: 5
    },
    {
        id: 2,
        name: 'Jane Doe', 
        testimonial: 'This is a testimonial',
        rating: 4
    },
    {
        id: 3,
        name: 'John Doe',
        testimonial: 'This is a testimonial',
        rating: 5
    },
]

const TestimonialComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentTestimonial = testimonials[currentIndex]

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, [])

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }, [])

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                What Our Clients Say
            </h1>
            <div className="relative max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTestimonial.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">
                                        {currentTestimonial.name[0]}
                                    </span>
                                </div>
                                <h2 className="ml-4 text-2xl font-semibold text-gray-800">
                                    {currentTestimonial.name}
                                </h2>
                            </div>
                            <p className="text-gray-600 text-lg flex-grow italic mb-6">
                                &ldquo;{currentTestimonial.testimonial}&rdquo;
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg 
                                            key={i} 
                                            className={`w-6 h-6 ${i < (currentTestimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <Button 
                                        onClick={handlePrevious}
                                        variant="outline"
                                        className="hover:bg-blue-50"
                                    >
                                        Previous
                                    </Button>
                                    <Button 
                                        onClick={handleNext}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default TestimonialComponent
