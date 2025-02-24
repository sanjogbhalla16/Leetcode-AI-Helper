import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiKeyInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <Label htmlFor="api-key">API Key</Label>
      <Input
        id="api-key"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter OpenAI API Key"
        required
        className="w-full"
      />
    </div>
  );
};

export default ApiKeyInput;
