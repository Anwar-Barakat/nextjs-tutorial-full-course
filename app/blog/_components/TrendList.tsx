import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const trendBlogs = [
  {
    id: 1,
    title: "Boost Your Productivity with These Time Management Techniques",
    count: 150,
    author: "Alice Johnson",
    authorImage: "https://randomuser.me/api/portraits/women/1.jpg",
    date: "2024-03-15",
    tags: ["Productivity", "Time Management"],
  },
  {
    id: 2,
    title: "Unlocking the Secrets of Successful Remote Collaboration",
    count: 120,
    author: "Bob Williams",
    authorImage: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2024-03-12",
    tags: ["Remote Work", "Collaboration"],
  },
  {
    id: 3,
    title: "Mastering the Art of Mindful Living in a Busy World",
    count: 95,
    author: "Carol Martinez",
    authorImage: "https://randomuser.me/api/portraits/women/2.jpg",
    date: "2024-03-10",
    tags: ["Mindfulness", "Well-being"],
  },
  {
    id: 4,
    title: "Elevate Your Fitness Routine with High-Intensity Interval Training",
    count: 80,
    author: "David Lee",
    authorImage: "https://randomuser.me/api/portraits/men/2.jpg",
    date: "2024-03-08",
    tags: ["Fitness", "HIIT"],
  },
  {
    id: 5,
    title: "The Ultimate Guide to Building a Strong Personal Brand Online",
    count: 65,
    author: "Eva Rodriguez",
    authorImage: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "2024-03-05",
    tags: ["Personal Branding", "Social Media"],
  },
];

const TrendList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendBlogs.map((trend) => (
            <Card key={trend.id} className="w-full flex flex-col">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Avatar>
                  <AvatarImage src={trend.authorImage} alt={trend.author} />
                  <AvatarFallback>{trend.author.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle>{trend.title}</CardTitle>
                  <p className="text-sm text-gray-500">By {trend.author}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mt-2">
                  {trend.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <div className="text-sm text-gray-500">
                  {trend.count} views • {trend.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendList;
