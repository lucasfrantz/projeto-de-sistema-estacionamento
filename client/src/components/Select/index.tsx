import React, { HTMLAttributes, useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  type: string;
  label: string;
}

export const Input = ({
  name,
  placeholder,
  label,
  type,
  ...rest
}: InputProps) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {label && <div>{label}</div>}
      <input
        name={name}
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};
