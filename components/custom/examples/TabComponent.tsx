'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState<string>('features');

    const tabs: Tab[] = [
        {
            id: 'features',
            label: 'Features',
            content: (
                <CardContent className="p-0">
                    <ul className="space-y-4 p-6">
                        <li className="flex items-center">
                            <div className="mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div>
                                <h4 className="font-semibold">Enhanced Performance</h4>
                                <p className="text-sm text-gray-500">Experience lightning-fast speeds with our optimized platform.</p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div>
                                <h4 className="font-semibold">User-Friendly Interface</h4>
                                <p className="text-sm text-gray-500">Navigate effortlessly with our intuitive and easy-to-use design.</p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <div className="mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div>
                                <h4 className="font-semibold">Advanced Security</h4>
                                <p className="text-sm text-gray-500">Protect your data with our state-of-the-art security measures.</p>
                            </div>
                        </li>
                    </ul>
                </CardContent>
            ),
        },
        {
            id: 'pricing',
            label: 'Pricing',
            content: (
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h4 className="font-semibold">Basic Plan</h4>
                            <p className="text-sm text-gray-500">$10/month - Includes basic features.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold">Pro Plan</h4>
                            <p className="text-sm text-gray-500">$25/month - Includes advanced features and priority support.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold">Enterprise Plan</h4>
                            <p className="text-sm text-gray-500">Contact us for custom pricing - Tailored solutions for large organizations.</p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="mt-4">View Detailed Pricing</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Detailed Pricing</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Here&apos;s a more detailed breakdown of our pricing plans.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <h5 className="font-medium">Basic Plan - $10/month</h5>
                                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                                            <li>Access to all basic features</li>
                                            <li>Email support</li>
                                            <li>Monthly updates</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="font-medium">Pro Plan - $25/month</h5>
                                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                                            <li>All Basic Plan features</li>
                                            <li>Priority email support</li>
                                            <li>Early access to new features</li>
                                            <li>Weekly updates</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="font-medium">Enterprise Plan - Custom Pricing</h5>
                                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                                            <li>All Pro Plan features</li>
                                            <li>Dedicated account manager</li>
                                            <li>Custom integrations</li>
                                            <li>24/7 support</li>
                                        </ul>
                                    </div>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Close</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            ),
        },
        {
            id: 'support',
            label: 'Support',
            content: (
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-500"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <div>
                            <h4 className="font-semibold">We&apos;re here to help</h4>
                            <p className="text-sm text-gray-500">Our dedicated support team is available to assist you every step of the way.</p>
                        </div>
                    </div>
                    <p className="text-sm">Contact us at <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a> for any inquiries or assistance.</p>
                </CardContent>
            ),
        },
    ];

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Explore Our Services</CardTitle>
                <CardDescription className="text-gray-500">
                    Navigate through our offerings using the tabs below.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="border rounded-md p-4 flex-grow">
                        {tabs.map((tab) => (
                            <TabsContent key={tab.id} value={tab.id} className={cn("mt-2 h-full")}>
                                {tab.content}
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default TabComponent
