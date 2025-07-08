'use client'
import { useState } from 'react'

export default function LoyaltyCard() {
  const [showCard, setShowCard] = useState(false)
  const [points, setPoints] = useState(250)

  return (
    <>
      <button 
        onClick={() => setShowCard(true)}
        className="fixed bottom-24 right-4 bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-all hover:scale-110 z-40"
      >
        <span className="text-xl">🎁</span>
      </button>

      {showCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowCard(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold mb-4">Ma carte de fidélité</h3>
            
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm opacity-80">Membre depuis 2023</p>
                  <p className="text-2xl font-bold">Jean Dupont</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{points}</p>
                  <p className="text-sm">points</p>
                </div>
              </div>
              <div className="grid grid-cols-8 gap-1">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-8 rounded ${i < 5 ? 'bg-white' : 'bg-white bg-opacity-30'}`}
                  />
                ))}
              </div>
              <p className="text-sm mt-3">5/8 interventions - Plus que 3 pour un service gratuit!</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>🎁 Réduction anniversaire</span>
                <span className="text-green-600 font-semibold">-20%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>🏆 Statut</span>
                <span className="text-purple-600 font-semibold">Gold</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>📅 Prochain avantage</span>
                <span className="text-blue-600 font-semibold">150 pts</span>
              </div>
            </div>

            <button className="btn-primary w-full mt-6">
              Utiliser mes points
            </button>
          </div>
        </div>
      )}
    </>
  )
}