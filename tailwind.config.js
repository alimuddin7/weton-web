/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                'javanese': ['"Inter"', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                luxury: {
                    ...require("daisyui/src/theming/themes")["luxury"],
                    "primary": "#d4af37",           // Rich gold (not cyan!)
                    "primary-content": "#1a1410",   // Very dark
                    "secondary": "#c1440e",         // Terracotta
                    "secondary-content": "#ffffff", // White
                    "accent": "#5a8c3a",            // Jade green
                    "accent-content": "#ffffff",    // White
                    "neutral": "#1a1410",           // Very dark brown
                    "neutral-content": "#f5e6d3",   // Light cream
                    "base-100": "#0a0806",          // Almost black background
                    "base-200": "#3e2f26",          // Dark brown for cards
                    "base-300": "#5d4a3c",          // Medium brown
                    "base-content": "#f5e6d3",      // Light cream text
                    "info": "#5a8c3a",              // Jade
                    "success": "#5a8c3a",           // Jade
                    "warning": "#d4af37",           // Gold
                    "error": "#c1440e",             // Terracotta
                },
            },
            {
                cupcake: {
                    ...require("daisyui/src/theming/themes")["cupcake"],
                    "primary": "#c1440e",           // Rich terracotta (vibrant!)
                    "primary-content": "#ffffff",   // White
                    "secondary": "#d4af37",         // Rich gold
                    "secondary-content": "#1a1410", // Very dark
                    "accent": "#5a8c3a",            // Jade green
                    "accent-content": "#ffffff",    // White
                    "neutral": "#2d1f1a",           // Very dark brown
                    "neutral-content": "#ffffff",   // White
                    "base-100": "#fafafa",          // Very light gray (almost white)
                    "base-200": "#d4a574",          // Dark tan for cards - MUCH DARKER
                    "base-300": "#b8865a",          // Even darker tan
                    "base-content": "#000000",      // Pure black text
                    "info": "#5a8c3a",              // Jade
                    "success": "#5a8c3a",           // Jade
                    "warning": "#d4af37",           // Gold
                    "error": "#c1440e",             // Terracotta
                },
            },
        ],
    },
}
