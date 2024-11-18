import { useState } from "react";
import { Eye, EyeSlash } from "./Icon";

const Input = ({
  label,
  type,
  eye,
  value,
  textarea,
  height,
  secondaryValue,
  required,
  options,
  optional,
  ...rest
}) => {
  const [inputType, setInputType] = useState(type);

  if (options?.length > 0)
    return (
      <>
        {label && (
          <div>
            <label className="form-label form--label">
              {label} {required && <span style={{ color: "red" }}>*</span>}
              {optional && <span>(optional)</span>}
            </label>
            <select required className="form-select form-control-2" {...rest}>
              <option className="d-none" selected></option>
              {options?.map((item, i) => (
                <option key={i} value={item?.value}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </>
    );
  return (
    <div>
      {label && (
        <label className="form-label form--label">
          {label} {required && <span style={{ color: "red" }}>*</span>}
          {optional && <span>(optional)</span>}
        </label>
      )}
      <div className="position-relative">
        {textarea ? (
          <textarea
            required
            className="form-control form-control-2 pt-2"
            type={inputType ? inputType : "text"}
            {...rest}
            value={value}
            style={{ height: height ? height : "" }}
          ></textarea>
        ) : (
          <>
            <input
              required={required}
              className="form-control form-control-2"
              type={inputType ? inputType : "text"}
              {...rest}
              value={value}
              style={{
                opacity: secondaryValue ? "0" : "",
                position: "relative",
                zIndex: "3",
              }}
            />
            {secondaryValue && (
              <input
                className="form-control form-control-2"
                style={{ position: "absolute", left: "0", top: "0" }}
                value={secondaryValue === "() -" ? "Phone" : secondaryValue}
              />
            )}
          </>
        )}
        {type === "password" &&
          (inputType === "password" ? (
            <span
              className="eye"
              onClick={() => {
                if (inputType === "password") {
                  setInputType("text");
                } else {
                  setInputType("password");
                }
              }}
            >
              <Eye />
            </span>
          ) : (
            <span
              className="eye"
              onClick={() => {
                if (inputType === "password") {
                  setInputType("text");
                } else {
                  setInputType("password");
                }
              }}
            >
              <EyeSlash />
            </span>
          ))}
      </div>
    </div>
  );
};

export default Input;
