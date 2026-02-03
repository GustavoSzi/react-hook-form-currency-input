import type { InputHTMLAttributes } from "react";
import type { Control, FieldValues } from "react-hook-form";

export type CurrencyInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    name: string;
    control: Control<FieldValues, any, FieldValues>;
    isDouble?: boolean;
    initialValue?: number;
};