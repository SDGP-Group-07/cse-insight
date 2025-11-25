import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    className,
    ...props
}) => {
    const baseStyles = "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-gradient-to-br from-accent-cyan to-accent-green text-primary-dark hover:shadow-[0_5px_15px_rgba(0,245,212,0.4)] hover:scale-105",
        secondary: "bg-transparent border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10",
        ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
        outline: "border border-white/20 text-white hover:bg-white/5"
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
