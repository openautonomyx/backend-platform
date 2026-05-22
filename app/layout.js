export const metadata = {
  title: 'Appwrite Auth Demo',
  description: 'Next.js App Router with Appwrite auth',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
