import localFont from "next/font/local";

export const lato = localFont({
  variable: "--font-lato",
  src: [
    { path: "./lato/Lato-Regular.ttf", weight: "500" },
    { path: "./lato/Lato-Black.ttf", weight: "600" },
    { path: "./lato/Lato-Light.ttf", weight: "300" },
    { path: "./lato/Lato-Thin.ttf", weight: "200" },
    { path: "./lato/Lato-Bold.ttf", weight: "600" },
  ],
});
