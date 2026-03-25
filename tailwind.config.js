// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  // content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        satoshiBold: ["Satoshi-Bold"],
        robotoBold:['Roboto-Bold'],
        nunitoBold:['Nunito-Bold'],
        robotoRegular:['Roboto-Regular'],
        dmsansBold:['DMSans-Bold'],
        interBold:['Inter_18pt-Bold'],
        urbanistBold:['Urbanist-Bold'],
        urbanistRegular:['Urbanist-Regular'],
        // prostoOne:['ProstoOne-Regular'],
        prostoOne:['prosto-One'],
        playFairDisplay:['PlayfairDisplay-Bold'],
        podKova:['Podkova-Bold'],
        opansans:['OpenSans-Regular'],
        poppins:['poppins'],
        helvetica:['HelveticaNeue-Black'],
        instrumentSansBold:['instrumentSans-Bold'],
        instrumentRegular:['instrumentSans-Regular'],
        instrumentSansSemiBold:['instrumentSans-SemiBold'],
      },
      colors:{
        darkYellow:'#FFC107',
        paleYellow:'#FEF9C3'
      }
    },
  },
  plugins: [],
};