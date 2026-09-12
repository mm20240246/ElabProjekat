import type { InputHTMLAttributes } from "react";

 

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {

  label?: string;

};

 

function FormInput({ label, id, className = "", ...props }: FormInputProps) {

  return (

    <div className={`form-input-wrapper ${className}`}>

      {label && (

        <label className="form-input-label" htmlFor={id}>

          {label}

        </label>

      )}

 

      <input id={id} className="form-input" {...props} />

    </div>

  );

}

 

export default FormInput;