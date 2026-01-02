/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                'javanese': ['"Inter"', 'sans-serif'], // We'll add a better font later
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
    ],
    daisyui: {
        themes: ["luxury", "dark", "cupcake"],
    },
}
