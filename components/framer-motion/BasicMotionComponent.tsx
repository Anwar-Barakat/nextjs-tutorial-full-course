"use client"

import React from 'react'
import { motion } from 'framer-motion'

const BasicMotionComponent = () => {
    return (
        <div>
            <motion.div
                className='box'
                initial={{
                    x: 0,
                    opacity: 0
                }}
                animate={{
                    x: 100,
                    opacity: 1
                }}
                transition={{
                    duration: 1,
                    when: "beforeChildren",  // Wait before animating children
                    staggerChildren: 0.3,    // Delay between each child
                    delayChildren: 0.5      // Delay all children
                }}
            />
            <hr className='py-8' />
            <motion.div
                className='box'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <hr className='py-8' />
            <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{
                    type: "tween",
                    duration: 0.5,
                    ease: "easeInOut"
                }}
            >
                Hover Me
            </motion.button>
            <hr className='py-8' />


            <motion.div
                className='box'
                animate={{ scale: 1.2 }}
                transition={{
                    type: "spring",
                    stiffness: 100,  // Energy
                    damping: 10      // Bounce
                }}
            />
            <hr className='py-8' />
            <motion.div
                className='box'
                animate={{ scale: 1.2 }}
                transition={{
                    type: "spring",
                    stiffness: 500,  // Energy
                    damping: 100      // Bounce
                }}
            />
            <hr className='py-8' />
            <motion.div
                className='box'
                drag
                transition={{
                    type: "inertia",
                    velocity: 50    // Speed
                }}
            />
            <hr className='py-8' />
            <motion.div
                className='box'
                animate={{
                    x: [0, 100, 0],    // Multiple positions
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
            />
            <hr className='py-8' />
        </div>
    )
}

export default BasicMotionComponent
