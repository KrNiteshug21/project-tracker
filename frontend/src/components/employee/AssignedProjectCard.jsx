import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const AssignedProjectCard = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link to={`/projects/${project._id}`}>{project.title}</Link>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="gap-2 grid">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">
                Start: {project.startDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">
                End: {project.endDate}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignedProjectCard;
