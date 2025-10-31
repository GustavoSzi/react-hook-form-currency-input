import type { Control, FieldValues } from "react-hook-form";

export interface CurrencyInputProps {
    name: string;
    control: Control<FieldValues, any, FieldValues>;
    isDouble?: boolean;
    initialValue?: number;
};