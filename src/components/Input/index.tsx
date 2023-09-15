import { useState, InputHTMLAttributes } from "react";

import styled from "../../styles/input.module.scss";

type InputProps = {
  label: string;
  initialValue?: string;
  error?: string;
  onInputChange?: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, initialValue = "", onInputChange, error, ...props }: InputProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    !!onInputChange && onInputChange(newValue);
  };
  return (
    <div className={styled.container}>
      <label className={styled.label}>{label}</label>
      <div className={styled.wrapperInput}>
        <input
          type="text"
          className={styled.input}
          onChange={onChange}
          value={value}
          {...props}
        />
      </div>

      {!!error && <label className={styled.error}>{error}</label>}
    </div>
  );
};

export { Input };
