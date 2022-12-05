import React from 'react';

interface inputProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  changeFn: { (e: React.ChangeEvent<HTMLInputElement>): void };
}

const InputWithLabel = (props: inputProps) => {
  return (
    <span>
      <label htmlFor={props.label}>{props.label}: </label>
      <input
        type={props.type}
        name={props.name}
        id={props.label}
        value={props.value}
        onChange={(e) => {
          props.changeFn(e);
        }}
      ></input>
    </span>
  );
};

export default InputWithLabel;
