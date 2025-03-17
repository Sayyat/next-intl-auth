import React from "react";
import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/components/ui/label";
import {
    Select as ShadCnSelect,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/shared/components/ui/select";

interface SelectFieldProps {
    name: string;
    label: string;
    options: {
        label: string;
        value: string;
    }[];
    className?: string; // Styles for the SelectTrigger
    labelClassName?: string; // Styles for the Label
    wrapperClassName?: string; // Styles for the wrapper
    error?: string; // Optional error message
}

export const Select: React.FC<SelectFieldProps> = ({
    name,
    label,
    options,
    className,
    labelClassName,
    wrapperClassName,
    error,
}) => (
    <div
        className={cn(
            "flex flex-col gap-2 p-4", // Base styles for wrapper
            wrapperClassName // Custom styles for wrapper
        )}
    >
        <Label
            htmlFor={name}
            className={cn("text-primaryColor font-medium", labelClassName)}
        >
            {label}
        </Label>
        <ShadCnSelect>
            <SelectTrigger
                className={cn(
                    "border text-gray-700 rounded-md px-3 py-2 w-full shadow-xs",
                    error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500",
                    "focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100",
                    "hover:border-gray-400 active:border-blue-600 transition-colors duration-150 ease-in-out",
                    className // Custom styles for SelectTrigger
                )}
            >
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadCnSelect>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);
