'use client'
import { Button } from '@radix-ui/themes'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
const PulsingButtons = () => {
    const [isClicked, setIsClicked] = useState(false)
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            {/* <motion.button
                className='bg-blue-500 text-white p-2 rounded-md'
                animate={{
                    scale: [1, 1.1, 1],    // Multiple positions
                    backgroundColor: ['#3291ff', '#312e81', '#2563eb'],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
            >
                Click Me
            </motion.button> */}

            <br className='py-8' />
            {/* <div className='flex gap-2'>
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <motion.div
                            key={index}
                            animate={{
                                translateY: [0, 10, 0],
                                backgroundColor: ['#3291ff', '#312e81', '#2563eb'],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: index * 0.5,
                                repeatType: "loop",
                                ease: "easeInOut",
                                repeatDelay: 0.5
                            }}
                            className='bg-blue-500 text-white p-2 w-10 h-10 rounded-full'
                        >
                        </motion.div>
                    ))
                }
            </div> */}

            <br className='py-8' />

            <motion.div className='box'
                variants={{
                    hidden: { opacity: 1, scale: 0.8 },
                    visible: { opacity: 1, scale: [1, 1.3, 1] },
                }}
                initial="hidden"
                animate={isClicked ? "visible" : "hidden"}
                transition={{ duration: 0.5 }}
                whileHover="hover"
                onClick={() => setIsClicked(!isClicked)}
            >

            </motion.div>

        </div>


    )
}

export default PulsingButtons

