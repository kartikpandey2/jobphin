"use client";
import cx from "classnames";

export default function Input(props) {
  const { onChange, pattern, className, error, errorMsg, ...restProps } = props;

  const validateChange = (e) => {
    const value = e.target.value;

    if (pattern && value) {
      const isValid = pattern.test(value);

      if (isValid) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  let inputClassName = "input";

  if (error) {
    inputClassName += " inputError";
  }

  return (
    <>
      <input
        className={cx(inputClassName, className)}
        {...restProps}
        onChange={validateChange}
      />
      {error && errorMsg ? (
        <div className="inputErrorMsg">{errorMsg}</div>
      ) : null}
    </>
  );
}
