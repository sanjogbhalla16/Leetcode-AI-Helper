import React from "react";
import { Button } from "@/components/ui/button"; // shadcn button
import { Loader2 } from "lucide-react"; // Icon for loading spinner
import { cn } from "@/lib/utils"; // Utility for conditional class merging

interface LoadingButtonProps {
  isLoading: boolean;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost"; // shadcn variants
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  onClick,
  children,
  className,
  variant = "default",
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant={variant}
      className={cn("w-full flex items-center justify-center gap-2", className)}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </Button>
  );
};

export default LoadingButton;
