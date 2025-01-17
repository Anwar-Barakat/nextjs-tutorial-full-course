"use client";

import usePasswordStore from "@/stores/passwordStore";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const PasswordGeneratorComponent = () => {
    const {
        password,
        generatePassword,
        setLength,
        toggleIncludeNumbers,
        toggleIncludeSymbols,
        toggleIncludeUppercase,
        toggleIncludeLowercase,
        length,
        includeNumbers,
        includeSymbols,
        includeUppercase,
        includeLowercase,
    } = usePasswordStore();

    const handleGeneratePassword = () => {
        generatePassword();
    };

    const handleLengthChange = (value: number[]) => {
        setLength(value[0]);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">
                Password Generator
            </h1>
            <Card className="border shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Generated Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-2xl font-bold p-4 border rounded-md bg-gray-100">
                        {password}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={handleGeneratePassword} className="w-full">
                        Generate Password
                    </Button>
                </CardFooter>
            </Card>
            <Card className="mt-8 border shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <Label htmlFor="length" className="font-medium">
                                Length: {length}
                            </Label>
                            <Slider
                                id="length"
                                defaultValue={[length]}
                                max={50}
                                min={1}
                                step={1}
                                onValueChange={handleLengthChange}
                                className="w-full"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <Label htmlFor="numbers" className="font-medium">
                                Include Numbers
                            </Label>
                            <Checkbox
                                id="numbers"
                                checked={includeNumbers}
                                onCheckedChange={toggleIncludeNumbers}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <Label htmlFor="symbols" className="font-medium">
                                Include Symbols
                            </Label>
                            <Checkbox
                                id="symbols"
                                checked={includeSymbols}
                                onCheckedChange={toggleIncludeSymbols}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <Label htmlFor="uppercase" className="font-medium">
                                Include Uppercase
                            </Label>
                            <Checkbox
                                id="uppercase"
                                checked={includeUppercase}
                                onCheckedChange={toggleIncludeUppercase}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <Label htmlFor="lowercase" className="font-medium">
                                Include Lowercase
                            </Label>
                            <Checkbox
                                id="lowercase"
                                checked={includeLowercase}
                                onCheckedChange={toggleIncludeLowercase}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PasswordGeneratorComponent;
