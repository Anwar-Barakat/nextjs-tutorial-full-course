'use client'

import { Button } from '@/components/ui/button';
import { useReceiptStore } from '@/draftStores/draft/receiptStore';
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const ReceiptComponent = () => {
    const { receipts, addReceipt, removeReceipt, resetReceipts, editReceipt, updateReceipt } = useReceiptStore();
    const [name, setName] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleAddReceipt = () => {
        addReceipt({ id: '', name, ingredients, instructions });
        setName('');
        setIngredients([]);
        setInstructions('');
    }

    const handleRemoveReceipt = (id: string) => {
        removeReceipt(id);
    }

    const handleEditReceipt = (id: string) => {
        const receiptToEdit = receipts.find((r) => r.id === id);
        if (receiptToEdit) {
            setName(receiptToEdit.name);
            setIngredients(receiptToEdit.ingredients);
            setInstructions(receiptToEdit.instructions);
            setIsEditing(true);
            setEditingId(id);
        }
    }

    const handleUpdateReceipt = () => {
        if (editingId) {
            updateReceipt(editingId, { name, ingredients, instructions });
            setName('');
            setIngredients([]);
            setInstructions('');
            setIsEditing(false);
            setEditingId(null);
        }
    }

    const handleResetReceipts = () => {
        resetReceipts();
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Receipt Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {receipts.map((receipt) => (
                    <Card key={receipt.id} className="border shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{receipt.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Label className="font-medium">Ingredients:</Label>
                                <ul className="list-disc list-inside">
                                    {receipt.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <Label className="font-medium">Instructions:</Label>
                                <p className="text-gray-700">{receipt.instructions}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => handleRemoveReceipt(receipt.id)} className="hover:bg-red-600 hover:text-white transition-colors duration-300">Remove</Button>
                            <Button variant="secondary" onClick={() => handleEditReceipt(receipt.id)} className="hover:bg-blue-600 hover:text-white transition-colors duration-300">Edit</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Card className="mt-8 border shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">{isEditing ? 'Edit Receipt' : 'Add New Receipt'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <Label htmlFor="name" className="font-medium">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <Label htmlFor="ingredients" className="font-medium">Ingredients</Label>
                            <Input
                                id="ingredients"
                                value={ingredients.join(',')}
                                onChange={(e) => setIngredients(e.target.value.split(','))}
                                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter ingredients separated by commas"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            <Label htmlFor="instructions" className="font-medium">Instructions</Label>
                            <Textarea
                                id="instructions"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                                placeholder="Enter instructions"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="justify-end">
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={handleResetReceipts} className="hover:bg-gray-300 transition-colors duration-300">Reset Receipts</Button>
                        <Button onClick={isEditing ? handleUpdateReceipt : handleAddReceipt} className="bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300">
                            {isEditing ? 'Update' : 'Add'} Receipt
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ReceiptComponent
