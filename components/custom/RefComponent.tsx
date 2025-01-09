'use client'

import React, { useRef, useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const RefComponent = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const [history, setHistory] = useState<string[]>([])

    const handleFocus = useCallback(() => {
        inputRef.current?.focus()
        setInputValue('')
    }, [])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, [])

    const handleSave = useCallback(() => {
        if (inputValue.trim()) {
            setHistory(prev => [...prev, inputValue])
            setInputValue('')
        }
    }, [inputValue])

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave()
        }
    }, [handleSave])

    return (
        <div className="container min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4">
            <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-2xl font-bold text-gray-800">Input History</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Type something..."
                                className="flex-1"
                            />
                            <Button onClick={handleFocus} variant="outline">
                                Focus
                            </Button>
                            <Button onClick={handleSave} disabled={!inputValue.trim()}>
                                Save
                            </Button>
                        </div>

                        <div className="h-[250px] w-full rounded-lg border border-gray-200 p-4 overflow-y-auto bg-white shadow-inner">
                            {history.length === 0 ? (
                                <p className="text-sm text-gray-500 italic text-center">No entries yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {history.map((entry, index) => (
                                        <div
                                            key={index}
                                            className="p-2 rounded-md bg-slate-50 text-sm font-medium text-gray-700"
                                        >
                                            {entry}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RefComponent
