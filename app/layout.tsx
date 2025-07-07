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
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <a href="/" className="flex items-center space-x-2">
                <span className="text-2xl">🚗</span>
                <span className="text-xl font-bold text-slate-800">PareBrise Genève Pro</span>
              </a>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/#services" className="text-slate-600 hover:text-blue-600">Services</a>
                <a href="/#calculateur" className="text-slate-600 hover:text-blue-600">Devis rapide</a>
                <a href="/#zones" className="text-slate-600 hover:text-blue-600">Zones</a>
                <a href="/#marques" className="text-slate-600 hover:text-blue-600">Marques</a>
                <a href="/#faq" className="text-slate-600 hover:text-blue-600">FAQ</a>
                <a href="tel:0221234567" className="btn-primary">📞 022 123 45 67</a>
              </nav>
              <a href="tel:0221234567" className="md:hidden btn-primary">📞 Appeler</a>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-slate-50 text-slate-700 py-12 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">PareBrise Genève Pro</h3>
                <p className="text-slate-600">
                  Votre expert en pare-brise à Genève depuis 2010
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-slate-600">✅ Agréé toutes assurances</p>
                  <p className="text-sm text-slate-600">✅ Garantie constructeur</p>
                  <p className="text-sm text-slate-600">✅ Certification ISO 9001</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-slate-600">
                  <li><a href="#" className="hover:text-blue-600">Remplacement pare-brise</a></li>
                  <li><a href="#" className="hover:text-blue-600">Réparation impact</a></li>
                  <li><a href="#" className="hover:text-blue-600">Calibrage ADAS</a></li>
                  <li><a href="#" className="hover:text-blue-600">Vitres latérales</a></li>
                  <li><a href="#" className="hover:text-blue-600">Lunette arrière</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Zones d&apos;intervention</h4>
                <ul className="space-y-2 text-slate-600">
                  <li><a href="/fr/zones/pare-brise-carouge" className="hover:text-blue-600">Carouge</a></li>
                  <li><a href="#" className="hover:text-blue-600">Genève Centre</a></li>
                  <li><a href="#" className="hover:text-blue-600">Meyrin</a></li>
                  <li><a href="#" className="hover:text-blue-600">Lancy</a></li>
                  <li><a href="#" className="hover:text-blue-600">Vernier</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact & Horaires</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>📞 022 123 45 67</li>
                  <li>📱 079 456 78 90 (Urgences)</li>
                  <li>✉️ contact@parebrise-geneve.ch</li>
                  <li>📍 Route de Meyrin 123, 1203 Genève</li>
                  <li className="pt-2">
                    <span className="text-green-600 font-semibold">● Ouvert maintenant</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Horaires:</p>
                  <p className="text-sm">Lun-Ven: 7h30-18h30</p>
                  <p className="text-sm">Sam: 8h00-16h00</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-slate-600">
              <p>&copy; 2024 PareBrise Genève Pro. Tous droits réservés. | <a href="#" className="hover:text-blue-600">Mentions légales</a> | <a href="#" className="hover:text-blue-600">CGV</a></p>
            </div>
          </div>
        </footer>

        {/* Live Chat Widget */}
        <div className="fixed bottom-4 right-4 z-50">
          <button className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all hover:scale-110">
            💬
          </button>
        </div>
      </body>
    </html>
  )
}