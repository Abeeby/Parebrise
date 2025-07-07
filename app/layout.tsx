import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PareBrise Genève Pro',
  description: 'Service professionnel de remplacement et réparation de pare-brise à Genève',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <a href="/" className="flex items-center space-x-2">
                <span className="text-2xl">🚗</span>
                <span className="text-xl font-bold text-blue-600">PareBrise Genève Pro</span>
              </a>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/#services" className="text-gray-700 hover:text-blue-600">Services</a>
                <a href="/#zones" className="text-gray-700 hover:text-blue-600">Zones</a>
                <a href="/#devis" className="text-gray-700 hover:text-blue-600">Contact</a>
                <a href="tel:0221234567" className="btn-primary">📞 022 123 45 67</a>
              </nav>
              <a href="tel:0221234567" className="md:hidden btn-primary">📞 Appeler</a>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">PareBrise Genève Pro</h3>
                <p className="text-gray-400">
                  Votre expert en pare-brise à Genève depuis 2010
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Remplacement</a></li>
                  <li><a href="#" className="hover:text-white">Réparation</a></li>
                  <li><a href="#" className="hover:text-white">Calibrage ADAS</a></li>
                  <li><a href="#" className="hover:text-white">Service mobile</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Zones</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/fr/zones/pare-brise-carouge" className="hover:text-white">Carouge</a></li>
                  <li><span className="opacity-50">Meyrin (bientôt)</span></li>
                  <li><span className="opacity-50">Lancy (bientôt)</span></li>
                  <li><span className="opacity-50">Vernier (bientôt)</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>📞 022 123 45 67</li>
                  <li>✉️ contact@parebrise-geneve.ch</li>
                  <li>📍 Genève, Suisse</li>
                  <li className="pt-2">
                    <span className="text-green-400">● Ouvert maintenant</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 PareBrise Genève Pro. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}