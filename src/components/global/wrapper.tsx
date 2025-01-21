import { cn } from "@/lib/utils";
import React from "react";

interface Props {
    className?: string;
    children: React.ReactNode;
}

const Wrapper = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                "w-full mx-auto lg:max-w-screen-xl lg:mx-auto px-4 md:px-12",
                className
            )}
        >
            {children}
        </div>
    )
};

export default Wrapper