"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const GSAPComponent = () => {
    const cardRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const tl = gsap.timeline()

        // Initial staggered animation
        tl.from(cardRef.current, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
            .from(titleRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=0.5")
            .from(textRef.current, {
                x: 50,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.3")
            .from(buttonRef.current, {
                y: 20,
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            }, "-=0.2")

        // Add hover effect on button
        const button = buttonRef.current
        if (button) {
            const handleMouseEnter = () => {
                gsap.to(button, {
                    scale: 1.1,
                    backgroundColor: "#2563eb",
                    duration: 0.3,
                    ease: "power2.out"
                })
            }

            const handleMouseLeave = () => {
                gsap.to(button, {
                    scale: 1,
                    backgroundColor: "#3b82f6",
                    duration: 0.3,
                    ease: "power2.in"
                })
            }

            button.addEventListener('mouseenter', handleMouseEnter)
            button.addEventListener('mouseleave', handleMouseLeave)

            return () => {
                button.removeEventListener('mouseenter', handleMouseEnter)
                button.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [])

    return (
        <div ref={cardRef} className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
            <h2 ref={titleRef} className="text-3xl font-bold mb-4 text-gray-800">
                Animated Card
            </h2>
            <p ref={textRef} className="text-gray-600 mb-6">
                This is an example of a more complex GSAP animation with staggered elements and interactive hover effects.
            </p>
            <button
                ref={buttonRef}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold transition-colors"
            >
                Learn More
            </button>
        </div>
    )
}

export default GSAPComponent
