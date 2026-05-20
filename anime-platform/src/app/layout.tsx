import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AnimePlatform - Découvrez et organisez vos animes préférés',
  description: 'La plateforme ultime pour découvrir, organiser et suivre vos animes. Interface moderne inspirée de Netflix, Crunchyroll et Spotify.',
  keywords: ['anime', 'manga', 'streaming', 'organisation', 'liste', 'tracking'],
  authors: [{ name: 'AnimePlatform' }],
  openGraph: {
    title: 'AnimePlatform - Découvrez et organisez vos animes préférés',
    description: 'La plateforme ultime pour découvrir, organiser et suivre vos animes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased bg-background text-white">
        {children}
      </body>
    </html>
  );
}
