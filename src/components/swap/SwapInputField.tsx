import React from 'react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SwapInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

export const SwapInputField: React.FC<SwapInputFieldProps> = ({
  value,
  onChange,
  placeholder = "0.0",
  className,
  readOnly = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow only numbers and one decimal point
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={cn(
        "h-16 text-2xl font-semibold bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl",
        "placeholder:text-muted-foreground/50",
        readOnly && "cursor-default bg-muted/10",
        className
      )}
    />
  );
};