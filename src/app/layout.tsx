import "./global.css";
import Script from "next/script";


export const metadata = {
  title: 'ParkNest',
  description: 'A parking space is a terrible thing to waste.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Bootstrap CSS --> */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" />

        {/* FontAwesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}

        {/* <!-- Option 1: Bootstrap Bundle with Popper --> */}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" />
        <Script src="https://unpkg.com/@turf/turf@latest" />

        {/* Mapbox */}
        <Script src="https://unpkg.com/@mapbox/mapbox-sdk/umd/mapbox-sdk.min.js" />

      </body>
    </html>
  )
}
