import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    image: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4",
    isFollowing: false,
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@doe.com",
    image: "https://avatars.githubusercontent.com/u/69631?s=200&v=4",
    isFollowing: true,
    role: "User",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john@smith.com",
    image: "https://avatars.githubusercontent.com/u/1884268?s=200&v=4",
    isFollowing: false,
    role: "User",
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane@smith.com",
    image: "https://avatars.githubusercontent.com/u/17177659?s=200&v=4",
    isFollowing: false,
    role: "Moderator",
  },
];

const UserList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          List of users in the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex items-center py-4 space-x-4">
              <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>
                  {user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <Badge className="ml-2">{user.role}</Badge>
                </div>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Button disabled={user.isFollowing} className="w-24">
                {user.isFollowing ? "Following" : "Follow"}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UserList;
