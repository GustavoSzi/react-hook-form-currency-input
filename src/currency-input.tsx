import React, { type JSX } from "react";
import { useController } from "react-hook-form";
import type { CurrencyInputProps } from "./types.js";

const numberFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * A React input component to handle currency inputs, where the user
 * enter a value starting with the cents. It uses the 'React hook form" to
 * make the input controlled.
 *
 * The component takes a `name` prop to identify the field in the form.
 * The `control` prop is used to register the field with React Hook Form.
 * The `isDouble` prop is used to determine if the input value should
 * be divided by 100 before being passed to React Hook Form. If not informed or
 * if its false, the value will be interpreted as a long.
 * The `initialValue` prop is used to set the initial value of the field, if needed.
 *
 * @param {CurrencyInputProps} props
 * @returns {JSX.Element}
 */
export default function CurrencyInput({
  name,
  control,
  isDouble = false,
  initialValue = 0,
}: CurrencyInputProps): JSX.Element {
  const { field } = useController({
    name,
    control,
  });

  const rawValue = React.useRef(initialValue);
  const [formattedValue, setFormattedValue] = React.useState("");

  const formatValue = React.useCallback((value: string | number) => {
      const inputValue = String(value).replaceAll(/[\D]/g, "");
      if (!inputValue || inputValue === "") return;

      const numberValue = Number(inputValue);

      if (numberValue === 0) {
        setFormattedValue("");
        rawValue.current = 0;
        field.onChange(rawValue.current);
        return;
      }

      rawValue.current = isDouble ? numberValue / 100 : numberValue;
      setFormattedValue(
        numberFormatter.format(Number((numberValue / 100).toFixed(2)))
      );
      field.onChange(rawValue.current);
    }, [field, isDouble]
  );

  React.useEffect(() => {
    if (initialValue === 0) return;

    formatValue(isDouble ? initialValue * 100 : initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    if (field.value === 0) return;

    formatValue(isDouble ? field.value * 100 : field.value);
  }, [field.value]);

  return (
    <input
      {...field}
      value={formattedValue}
      name={name}
      placeholder="R$ 0,00"
      onChange={(e) => {
        formatValue(e.target.value);
      }}
    />
  );
}
