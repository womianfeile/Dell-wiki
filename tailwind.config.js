/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                pixel: ['"DottedPixel"', 'ui-monospace', 'monospace'],
                display: ['"DottedPixel"', 'ui-monospace', 'monospace'],
            },
            boxShadow: {
                soft: '0 14px 40px rgba(79, 94, 143, 0.12)',
                hover: '0 20px 55px rgba(79, 94, 143, 0.22)',
            },
            colors: {
                'palette-mint': 'var(--palette-mint, #BEEFE6)',
                'palette-lavender': 'var(--palette-lavender, #C5B9FB)',
                'palette-cream-yellow': 'var(--palette-cream-yellow, #F6D68F)',
                'palette-soft-grey': 'var(--palette-soft-grey, #F0F0F2)',
                'palette-coral': 'var(--palette-coral, #FD9978)',
                'palette-blue': 'var(--palette-blue, #8FB6D6)',
                'highlight-yellow': 'var(--highlight-yellow, #FEC837)',
            },
        },
    },
    plugins: [],
};

export default config;
