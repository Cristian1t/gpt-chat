"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const isLight = resolvedTheme === `light`;
    const oppositeTheme = isLight ? `dark` : `light`;

    const toggleTheme = () => setTheme(oppositeTheme);

    return (
        <button onClick={toggleTheme} className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <div className="flex items-center gap-3">
                {!isLight ? <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                     strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em"
                     width="1em" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg> :
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
                     strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>}
                <span>{`${oppositeTheme.charAt(0).toUpperCase()}${oppositeTheme.slice(1)} mode`}</span>
            </div>
        </button>
    );
};
