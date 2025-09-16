import "./globals.css";

export const metadata = {
  title: "Happy Birthday!!! :)",
  description: "A beautiful birthday animation with 3D interactions",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body className={`antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}