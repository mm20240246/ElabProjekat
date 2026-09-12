import type { ButtonHTMLAttributes, ReactNode } from "react";

 

type ButtonVariant = "primary" | "secondary" | "danger";

 

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {

  children: ReactNode;

  variant?: ButtonVariant;

  fullWidth?: boolean;

};

 

function Button({

  children,

  variant = "primary",

  fullWidth = false,

  className = "",

  ...props

}: ButtonProps) {

  const classes = [

    "app-button",

    `app-button--${variant}`,

    fullWidth ? "app-button--full" : "",

    className,

  ]

    .filter(Boolean)

    .join(" ");

 

  return (

    <button className={classes} {...props}>

      {children}

    </button>

  );

}

 

export default Button;