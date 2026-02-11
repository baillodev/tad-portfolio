import './globals.css';

export const metadata = {
  title: 'Abdourahmane Diallo — Designer Graphique',
  description:
    'Portfolio de Abdourahmane Diallo, directeur artistique et designer graphique spécialisé en logo, branding et identité visuelle.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
