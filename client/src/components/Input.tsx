import React from "react";

interface InputProps {
  label: string;
  htmlFor: string;
  type: string;
  name: string;
  id: string;
  value: string;
  onChangeHandler: React.ChangeEventHandler<any>;
  keyPressHandler?: React.KeyboardEventHandler;
  style?: Record<string, string | number>;
}

const Input: React.FC<InputProps> = ({
  label,
  htmlFor,
  type,
  name,
  id,
  value,
  onChangeHandler,
  keyPressHandler,
  style,
}) => (
  <div className="input-field">
    <input
      className="yellow-input"
      type={type}
      name={name}
      id={id}
      value={value}
      style={{ color: "white", ...style }}
      onChange={onChangeHandler}
      onKeyPress={keyPressHandler}
    />
    <label htmlFor={htmlFor}>{label}</label>
  </div>
);

export default React.memo(Input);
