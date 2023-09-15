import { useState, ChangeEvent, SelectHTMLAttributes } from "react";

import styled from "../../styles/select.module.scss";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  error?: string;
  onChange?: (selectedValue: string) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ label, options, error, onChange, ...props }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className={styled.container}>
      <label className={styled.label}>{label}</label>
      <div className={styled.wrapperSelect}>
        <select
          value={selectedOption}
          onChange={handleChange}
          className={styled.select}
          {...props}
        >
          <option value="">Selecione uma opção</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {!!error && <label className={styled.error}>{error}</label>}
    </div>
  );
};

export { Select };
