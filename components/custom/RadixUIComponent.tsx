"use client";

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Separator from '@radix-ui/react-separator';
import { BookmarkIcon } from 'lucide-react';
import React from 'react';

const RadixUIComponent = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <NavigationMenu.Root className="relative z-10 flex justify-between items-center p-6">
        <NavigationMenu.List className="flex gap-6">
          <NavigationMenu.Item>
            <NavigationMenu.Link className="text-lg font-medium text-foreground hover:text-primary transition-colors">
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link className="text-lg font-medium text-foreground hover:text-primary transition-colors">
              Features
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link className="text-lg font-medium text-foreground hover:text-primary transition-colors">
              About
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>

      <main className="max-w-4xl mx-auto mt-20">
        <h1 className="text-5xl font-bold text-center mb-6 text-foreground">
          Bookmark Manager
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-12">
          Organize and manage your bookmarks efficiently
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-card rounded-lg shadow-sm border border-border">
            <BookmarkIcon className="w-8 h-8 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Add Bookmarks</h2>
            <p className="text-muted-foreground">Quickly save your favorite websites</p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-sm border border-border">
            <BookmarkIcon className="w-8 h-8 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">View Collection</h2>
            <p className="text-muted-foreground">Browse through your saved bookmarks</p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-sm border border-border">
            <BookmarkIcon className="w-8 h-8 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Organize</h2>
            <p className="text-muted-foreground">Categorize and manage your bookmarks</p>
          </div>
        </div>

        <Separator.Root className="h-px bg-border my-16" />

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Get Started Today</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users who trust our bookmark manager
          </p>
        </div>
      </main>
    </div>
  );
};

export default RadixUIComponent;
