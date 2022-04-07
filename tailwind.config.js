module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        '1/12': '8.33333333%',
        '3/24': '12.5%',
        '11/12': '91.6666667%',
        '1/24': '4.16666667%',
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1536px',
      },
    },
  },
  plugins: [],
};
