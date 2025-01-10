'use client'

import React, { useReducer, useCallback, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, Minus, X, Divide, RotateCcw, History, Percent, Square } from "lucide-react"
import { RiSquareRoot } from "react-icons/ri";

const initialState = {
    number1: 0,
    number2: 0,
    result: 0,
    history: [] as { operation: string, result: number, timestamp: string }[],
    error: null as string | null
}

type CalculatorState = typeof initialState

type CalculatorAction =
    | { type: 'setNumber1', payload: number }
    | { type: 'setNumber2', payload: number }
    | { type: 'add', payload: number }
    | { type: 'subtract', payload: number }
    | { type: 'multiply', payload: number }
    | { type: 'divide', payload: number }
    | { type: 'percentage', payload: number }
    | { type: 'square', payload: number }
    | { type: 'squareRoot', payload: number }
    | { type: 'reset' }
    | { type: 'setError', payload: string | null }
    | { type: 'addToHistory', payload: { operation: string, result: number, timestamp: string } }

const calculateReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
    switch (action.type) {
        case 'setNumber1':
            return { ...state, number1: action.payload, error: null }
        case 'setNumber2':
            return { ...state, number2: action.payload, error: null }
        case 'add':
            return { ...state, result: state.number1 + action.payload, error: null }
        case 'subtract':
            return { ...state, result: state.number1 - action.payload, error: null }
        case 'multiply':
            return { ...state, result: state.number1 * action.payload, error: null }
        case 'divide':
            if (action.payload === 0) {
                return { ...state, error: "Cannot divide by zero" }
            }
            return { ...state, result: state.number1 / action.payload, error: null }
        case 'percentage':
            return { ...state, result: (state.number1 * action.payload) / 100, error: null }
        case 'square':
            return { ...state, result: Math.pow(action.payload, 2), error: null }
        case 'squareRoot':
            if (action.payload < 0) {
                return { ...state, error: "Cannot calculate square root of negative number" }
            }
            return { ...state, result: Math.sqrt(action.payload), error: null }
        case 'addToHistory':
            return { ...state, history: [...state.history, action.payload].slice(-10) }
        case 'setError':
            return { ...state, error: action.payload }
        case 'reset':
            return { ...initialState, history: state.history }
        default:
            return state
    }
}

const CalculatorComponent = () => {
    const [state, dispatch] = useReducer(calculateReducer, initialState)
    const [showHistory, setShowHistory] = useState(false)

    // Save history to localStorage
    useEffect(() => {
        localStorage.setItem('calculatorHistory', JSON.stringify(state.history))
    }, [state.history])

    const handleNumber1Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (!isNaN(value)) {
            dispatch({ type: 'setNumber1', payload: value })
        }
    }, [])

    const handleNumber2Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (!isNaN(value)) {
            dispatch({ type: 'setNumber2', payload: value })
        }
    }, [])

    const updateHistoryAndResult = useCallback((operation: string, result: number) => {
        const timestamp = new Date().toLocaleString()
        dispatch({ type: 'addToHistory', payload: { operation, result, timestamp } })
    }, [])

    const handleOperation = useCallback((operation: string) => {
        let result: number
        switch (operation) {
            case 'add':
                result = state.number1 + state.number2
                dispatch({ type: 'add', payload: state.number2 })
                break
            case 'subtract':
                result = state.number1 - state.number2
                dispatch({ type: 'subtract', payload: state.number2 })
                break
            case 'multiply':
                result = state.number1 * state.number2
                dispatch({ type: 'multiply', payload: state.number2 })
                break
            case 'divide':
                if (state.number2 === 0) {
                    dispatch({ type: 'setError', payload: "Cannot divide by zero" })
                    return
                }
                result = state.number1 / state.number2
                dispatch({ type: 'divide', payload: state.number2 })
                break
            case 'percentage':
                result = (state.number1 * state.number2) / 100
                dispatch({ type: 'percentage', payload: state.number2 })
                break
            case 'square':
                result = Math.pow(state.number1, 2)
                dispatch({ type: 'square', payload: state.number1 })
                break
            case 'squareRoot':
                if (state.number1 < 0) {
                    dispatch({ type: 'setError', payload: "Cannot calculate square root of negative number" })
                    return
                }
                result = Math.sqrt(state.number1)
                dispatch({ type: 'squareRoot', payload: state.number1 })
                break
            default:
                return
        }   
        updateHistoryAndResult(operation, result)
    }, [state.number1, state.number2, updateHistoryAndResult])

    const handleReset = useCallback(() => {
        dispatch({ type: 'reset' })
    }, [])

    const toggleHistory = useCallback(() => {
        setShowHistory(prev => !prev)
    }, [])

    return (
        <div className="container min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4">
            <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-2xl font-bold text-gray-800">Advanced Calculator</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Number</label>
                            <Input
                                type="number"
                                value={state.number1}
                                onChange={handleNumber1Change}
                                className="w-full"
                                placeholder="Enter first number"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Second Number</label>
                            <Input
                                type="number"
                                value={state.number2}
                                onChange={handleNumber2Change}
                                className="w-full"
                                placeholder="Enter second number"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button onClick={() => handleOperation('add')} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
                            <Plus size={16} /> Add
                        </Button>
                        <Button onClick={() => handleOperation('subtract')} className="flex items-center gap-2 bg-red-500 hover:bg-red-600">
                            <Minus size={16} /> Subtract
                        </Button>
                        <Button onClick={() => handleOperation('multiply')} className="flex items-center gap-2 bg-green-500 hover:bg-green-600">
                            <X size={16} /> Multiply
                        </Button>
                        <Button onClick={() => handleOperation('divide')} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600">
                            <Divide size={16} /> Divide
                        </Button>
                        <Button onClick={() => handleOperation('percentage')} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600">
                            <Percent size={16} /> Percentage
                        </Button>
                        <Button onClick={() => handleOperation('square')} className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600">
                            <Square size={16} /> Square
                        </Button>
                        <Button onClick={() => handleOperation('squareRoot')} className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600">
                            <RiSquareRoot size={16} /> Square Root
                        </Button>
                    </div>

                    <div className="flex justify-center gap-3">
                        <Button
                            onClick={handleReset}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <RotateCcw size={16} /> Reset
                        </Button>
                        <Button
                            onClick={toggleHistory}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <History size={16} /> History
                        </Button>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {state.error ? (
                            <p className="text-center text-lg font-semibold text-red-500">
                                Error: {state.error}
                            </p>
                        ) : (
                            <p className="text-center text-lg font-semibold">
                                Result: <span className="text-blue-600">{state.result.toFixed(4)}</span>
                            </p>
                        )}
                    </div>

                    {showHistory && state.history.length > 0 && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-md font-semibold mb-2">Last 10 Operations:</h3>
                            <div className="space-y-2">
                                {state.history.map((item, index) => (
                                    <div key={index} className="text-sm text-gray-600 flex justify-between">
                                        <span>{item.operation}: {item.result.toFixed(4)}</span>
                                        <span className="text-gray-400">{item.timestamp}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default CalculatorComponent
