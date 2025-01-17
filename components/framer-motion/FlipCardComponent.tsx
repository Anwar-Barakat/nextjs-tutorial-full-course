"use client";

import React, { useState, useEffect } from 'react';

interface FlipCardProps {
    frontContent?: React.ReactNode;
    backContent?: React.ReactNode;
    width?: string;
    height?: string;
    frontBgColor?: string;
    backBgColor?: string;
    autoFlip?: boolean;
    autoFlipInterval?: number;
    onFlip?: (isFlipped: boolean) => void;
    className?: string;
    hoverable?: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({
    frontContent = 'Front',
    backContent = 'Back',
    width = 'w-64',
    height = 'h-96',
    frontBgColor = 'bg-blue-500',
    backBgColor = 'bg-red-500',
    autoFlip = false,
    autoFlipInterval = 3000,
    onFlip = () => { },
    className = '',
    hoverable = true
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (autoFlip) {
            timer = setInterval(() => {
                handleFlip();
            }, autoFlipInterval);
        }
        return () => clearInterval(timer);
    }, [autoFlip, autoFlipInterval]);

    const handleFlip = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setIsFlipped(!isFlipped);
            onFlip(!isFlipped);
            setTimeout(() => setIsAnimating(false), 800); // Match animation duration
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div
                className={`
          perspective-1000 cursor-pointer
          ${width} ${height}
          ${hoverable ? 'hover:scale-105' : ''}
          transition-transform duration-300
        `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleFlip}
            >
                <div
                    className={`
            relative w-full h-full
            transition-transform duration-800 ease-in-out
            transform-style-preserve-3d
            ${isFlipped ? 'rotate-y-180' : 'rotate-y-0'}
          `}
                >
                    {/* Front of card */}
                    <div
                        className={`
              absolute w-full h-full
              flex flex-col items-center justify-center
              ${frontBgColor} text-white rounded-lg shadow-lg
              backface-hidden
              ${isHovered ? 'shadow-xl' : 'shadow-md'}
              transition-shadow duration-300
            `}
                    >
                        <div className="text-2xl font-bold p-6">
                            {frontContent}
                        </div>
                        {!isFlipped && (
                            <div className="absolute bottom-4 text-sm opacity-75">
                                Click to flip
                            </div>
                        )}
                    </div>

                    {/* Back of card */}
                    <div
                        className={`
              absolute w-full h-full
              flex flex-col items-center justify-center
              ${backBgColor} text-white rounded-lg shadow-lg
              backface-hidden rotate-y-180
              ${isHovered ? 'shadow-xl' : 'shadow-md'}
              transition-shadow duration-300
            `}
                    >
                        <div className="text-2xl font-bold p-6">
                            {backContent}
                        </div>
                        {isFlipped && (
                            <div className="absolute bottom-4 text-sm opacity-75">
                                Click to flip back
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Optional flip counter or status indicator */}
            <div className="mt-4 text-sm text-gray-600">
                {isAnimating ? 'Flipping...' : `Card is ${isFlipped ? 'back' : 'front'} side up`}
            </div>
        </div>
    );
};

// Demo component showing different uses of FlipCard
const FlipCardDemo: React.FC = () => {
    const [flipCount, setFlipCount] = useState(0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {/* Basic card */}
            <FlipCard
                frontContent={<div className="text-center">Basic Card Front</div>}
                backContent={<div className="text-center">Basic Card Back</div>}
            />

            {/* Auto-flipping card */}
            <FlipCard
                frontContent={<div className="text-center">Auto Flip Card</div>}
                backContent={<div className="text-center">Flips Every 3s</div>}
                autoFlip={true}
                frontBgColor="bg-green-500"
                backBgColor="bg-purple-500"
            />

            {/* Custom sized card with flip counter */}
            <FlipCard
                frontContent={
                    <div className="text-center">
                        <div>Custom Card</div>
                        <div className="text-sm mt-2">Flipped {flipCount} times</div>
                    </div>
                }
                backContent={<div className="text-center">Keep flipping!</div>}
                width="w-48"
                height="h-72"
                frontBgColor="bg-indigo-500"
                backBgColor="bg-pink-500"
                onFlip={() => setFlipCount(prev => prev + 1)}
            />
        </div>
    );
};

export default FlipCardDemo;