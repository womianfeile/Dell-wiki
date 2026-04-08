export default {
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
                dusk: '#1f2432',
                paper: '#fbfbf7',
                mint: '#b6f0e6',
                lilac: '#d7c2ff',
                butter: '#ffe39c',
                blush: '#ffc9cf',
                'macaron-green': 'var(--macaron-green, #BEEFE6)',
                'macaron-purple': 'var(--macaron-purple, #C5B9FB)',
                'macaron-yellow': 'var(--macaron-yellow, #F6D68F)',
                'macaron-grey': 'var(--macaron-grey, #F0F0F2)',
            },
        },
    },
    plugins: [],
};
