import React from 'react';
import useForm from '../../Hooks/useform';

interface inputProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  changeFn: { (e: React.ChangeEvent<HTMLInputElement>): void };
}

const InputWithLabel = (props: inputProps) => {
  const { handleChange, errors } = useForm();
  return (
    <span className="flex flex-col items-start justify-start pb-1 w-60">
      <label htmlFor={props.label}>{props.label}: </label>
      <input
        type={props.type}
        name={props.name}
        id={props.label}
        value={props.value}
        onChange={(e) => {
          props.changeFn(e);
          handleChange(e);
        }}
      ></input>
      {errors.name && (
        <h3 className="capitalize text-red-400 max-w-fit">{errors.name}</h3>
      )}
    </span>
  );
};

export default InputWithLabel;
