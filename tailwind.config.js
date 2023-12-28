/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx,png}",],
  theme: {
    extend: { 
      screens: {
    "sm-mb":{"max":"280px"},
    "md-mb":{"max":"320px"},
    "lg-mb":{"max":"425px"},
    "xl-mb":{"max":"680px"},
    "sm-tl":{"max":"768px"},
    "md-tl":{"max":"1024px"},
    "md-pc":{"max":"1440px"},
    "lg-pc":{"max":"1920px"},
  },
  backgroundImage: {
    'bgloginMB': `url('assets/images/bg_loginMB.png')`,
    'bgloginTL': `url('assets/images/bg_loginTL.png')`,
    'bgloginPC': `url('assets/images/bg_loginPC.png')`,
  }
  },
  plugins: [],
}
}

