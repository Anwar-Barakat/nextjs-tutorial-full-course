'use client'

import React, { useReducer, useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, X } from "lucide-react"

interface ShoppingState {
    count: number;
    items: string[];
    total: number;
}

const initialState: ShoppingState = {
    count: 0,
    items: [],
    total: 0
}

type ShoppingAction =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'update_count'; payload: number }
    | { type: 'add_item'; payload: string }
    | { type: 'remove_item'; payload: string }
    | { type: 'update_total'; payload: number };

const shoppingReducer = (state: ShoppingState, action: ShoppingAction): ShoppingState => {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 }
        case 'decrement':
            return { ...state, count: Math.max(0, state.count - 1) }
        case 'update_count':
            return { ...state, count: Math.max(0, action.payload) }
        case 'add_item':
            return { ...state, items: [...state.items, action.payload] }
        case 'remove_item':
            return { ...state, items: state.items.filter(item => item !== action.payload) }
        case 'update_total':
            return { ...state, total: action.payload }
        default:
            return state
    }
}

const ReducerComponent = () => {
    const [state, dispatch] = useReducer(shoppingReducer, initialState)
    const [inputCount, setInputCount] = useState<number | undefined>(state.count)
    const [newItem, setNewItem] = useState<string>('')

    const handleUpdateCount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (isNaN(value)) {
            setInputCount(undefined)
            return
        }
        setInputCount(value)
        dispatch({ type: 'update_count', payload: value })
    }, [])

    const handleAddItem = useCallback(() => {
        if (newItem.trim()) {
            dispatch({ type: 'add_item', payload: newItem.trim() })
            setNewItem('')
        }
    }, [newItem])

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddItem()
        }
    }, [handleAddItem])

    const handleRemoveItem = useCallback((item: string) => {
        dispatch({ type: 'remove_item', payload: item })
    }, [])

    const handleIncrement = useCallback(() => {
        dispatch({ type: 'increment' })
        setInputCount(prev => (prev ?? 0) + 1)
    }, [])

    const handleDecrement = useCallback(() => {
        dispatch({ type: 'decrement' })
        setInputCount(prev => Math.max(0, (prev ?? 0) - 1))
    }, [])

    return (
        <div className="container min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4">
            <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="text-2xl font-bold text-gray-800">Shopping List</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Items Count</h3>
                            <div className="flex items-center space-x-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleDecrement}
                                    disabled={state.count <= 0}
                                    aria-label="Decrease count"
                                    className="hover:bg-slate-100 transition-colors duration-200"
                                >
                                    <Minus className="h-4 w-4 text-gray-600" />
                                </Button>
                                <Input
                                    type="number"
                                    className="w-24 text-center font-medium text-gray-700 focus:ring-2 focus:ring-blue-500"
                                    min={0}
                                    onChange={handleUpdateCount}
                                    value={inputCount ?? ''}
                                    placeholder="0"
                                    aria-label="Item count"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleIncrement}
                                    aria-label="Increase count"
                                    className="hover:bg-slate-100 transition-colors duration-200"
                                >
                                    <Plus className="h-4 w-4 text-gray-600" />
                                </Button>
                            </div>
                        </div>

                        <Separator className="bg-gray-200" />

                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Add Item</h3>
                            <div className="flex space-x-3">
                                <Input
                                    type="text"
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Enter item name"
                                    aria-label="New item name"
                                    className="flex-1 focus:ring-2 focus:ring-blue-500"
                                />
                                <Button
                                    onClick={handleAddItem}
                                    disabled={!newItem.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                                >
                                    Add
                                </Button>
                            </div>
                        </div>

                        <Separator className="bg-gray-200" />

                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Shopping Items</h3>
                            <div className="h-[250px] w-full rounded-lg border border-gray-200 p-4 overflow-y-auto bg-white shadow-inner">
                                {state.items.length === 0 ? (
                                    <p className="text-sm text-gray-500 italic text-center">No items added yet</p>
                                ) : (
                                    <div className="space-y-2">
                                        {state.items.map((item, index) => (
                                            <div
                                                key={`${item}-${index}`}
                                                className="flex items-center justify-between group p-2 rounded-md hover:bg-slate-50 transition-colors duration-200"
                                            >
                                                <span className="text-sm font-medium text-gray-700">{item}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemoveItem(item)}
                                                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                                                    aria-label={`Remove ${item}`}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ReducerComponent
