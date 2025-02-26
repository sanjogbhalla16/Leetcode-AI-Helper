import React from "react";
import { Loader2 } from "lucide-react"; // Using Lucide React for loader

/**
 * A component that conditionally renders its children based on the `show` prop.
 * If `show` is false, it displays a loading spinner.
 */
interface ShowProps {
  show: boolean;
  children: React.ReactNode;
}

const Show: React.FC<ShowProps> = ({ show, children }) => {
  return show ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  ) : (
    children
  );
};

export default Show;
