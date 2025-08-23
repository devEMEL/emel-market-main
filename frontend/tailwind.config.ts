import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                navy: {
                    900: '#0A192F',
                    950: '#060D1B',
                },
                charcoal: {
                    900: '#1C1C1E',
                    950: '#141415',
                },
            },
            backgroundImage: {
                'gradient-midnight': 'linear-gradient(to bottom right, #1a1a2e, #16213E, #0F3460)',
                'gradient-cosmos': 'linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)',
                'gradient-deep': 'linear-gradient(to bottom right, #000428, #004e92)',
                'gradient-royal': 'linear-gradient(to bottom right, #141e30, #243b55)',
                'gradient-space': 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)',
            },
        },
    },
    plugins: [],
};
export default config;
