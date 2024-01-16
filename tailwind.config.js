/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,png}'],
  theme: {
    extend: {
      screens: {
        'sm-mb': { max: '280px' },
        'md-mb': { max: '320px' },
        'lg-mb': { max: '425px' },
        'xl-mb': { max: '680px' },
        'sm-tl': { max: '768px' },
        'md-tl': { max: '1024px' },
        'md-pc': { max: '1440px' },
        'lg-pc': { max: '1920px' },
      },
      backgroundImage: {
        bgloginMB: `url('assets/images/bg_accountMB.jpg')`,
        bgloginTL: `url('assets/images/bg_accountMB.jpg')`,
        bgloginPC: `url('assets/images/bg_accountMB.jpg')`,
      },
      textColor: {
        labelText: 'rgba(255,255,255,0.6)', // Thêm một màu tùy chỉnh với tên 'custom-color'
        whiteText: '#fff', // Thêm một màu tùy chỉnh với tên 'custom-color'
      },
      fontSize: {
        textSizeMb: '15px',
      },
    },
    plugins: [],
  },
}
