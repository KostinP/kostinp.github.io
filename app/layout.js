import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
