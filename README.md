# React Currency Input (for react-hook-form)

React Currency Input component, for using with react-hook-form.

## Usage

```tsx
function MyReactForm() {
    const { control, ... } = useForm();

    return (<>
        { /* ... */ }
        { /* Optionally, place the component inside a label element */}
        <label>
            Income
            <CurrencyInput 
                control={control}
                name="income"
            />
        </label>

        { /* ... */ }
    </>)
}
```

| Prop name    | Type                   | Description                                                                   | 
|--------------|------------------------|-------------------------------------------------------------------------------|
| control*     | Control<FieldValues, any, FieldValues> | Control object, obtained in the "useForm" hook |
| name*        | string                                 | Name of the field for registering to the hook  |
| isDouble     | boolean                                | By default, the component will treat the typed value as a Long ($1,00 => 100). By setting this to true, the component will treat it as a Double ($1,00 => 1.00). |
| initialValue | number                                 | Value to be set initially. You can either inform it in this prop, or set it using react-hook-form's functions. |