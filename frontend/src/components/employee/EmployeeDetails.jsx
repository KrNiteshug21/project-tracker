import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import { Mail, Star, User } from "lucide-react";

const EmployeeDetails = ({ employee }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Employee avatar" src="/placeholder.svg" />
            <AvatarFallback>N95</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-2xl">Employee Details</CardTitle>
            <CardDescription>
              View your profile and performance metrics
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">Name:</span>
            <span className="font-medium">{employee.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">Email:</span>
            <span className="font-medium">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">Score:</span>
            <span className="font-medium">{employee.scores}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{employee.role}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
