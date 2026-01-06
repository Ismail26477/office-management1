import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, MoreVertical } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Wilson",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    status: "online",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    status: "online",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Project Manager",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    status: "away",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Backend Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    status: "offline",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "HR Manager",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    status: "online",
  },
];

const statusColors = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
};

export function TeamMembersList() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-sm">
      <div className="p-5 border-b border-border/50">
        <h3 className="font-semibold text-foreground">Team Members</h3>
        <p className="text-sm text-muted-foreground">Active team members today</p>
      </div>
      <div className="divide-y divide-border/50">
        {teamMembers.map((member) => (
          <div key={member.id} className="p-4 flex items-center gap-3 table-row-hover">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${statusColors[member.status as keyof typeof statusColors]}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">{member.role}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5">
          View All Members
        </Button>
      </div>
    </div>
  );
}
