interface DividerProps {
    text: string
    className?: string
}

export function Divider({ text, className }: DividerProps) {
    return (
        <div className="flex items-center justify-center w-full gap-4 my-8">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent from-10% to-90% to-blue-500 relative">
                <div className="absolute right-0 -top-0.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>

            <div className="px-4 py-2 rounded-lg bg-black backdrop-blur-sm border-2 border-blue-500 border-opacity-70 text-white">
                {text}
            </div>

            <div className="h-[1px] w-32 bg-gradient-to-r from-blue-500 from-10% to-90% to-transparent relative">
            <div className="absolute left-0 -top-0.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
        </div>
    )
}

