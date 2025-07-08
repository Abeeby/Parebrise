'use client'
import { useState } from 'react'

export default function VideoConsultation() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle, connecting, connected

  const startCall = () => {
    setStatus('connecting')
    setTimeout(() => setStatus('connected'), 2000)
  }

  return (
    <>
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🎥 Diagnostic vidéo gratuit</h3>
            <p className="text-gray-600">
              Montrez-nous votre pare-brise en direct pour un devis immédiat
            </p>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="btn-primary bg-green-600 hover:bg-green-700"
          >
            Démarrer
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Consultation vidéo</h3>
              <button 
                onClick={() => {setIsOpen(false); setStatus('idle')}}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative">
              {status === 'idle' && (
                <div className="text-center">
                  <div className="text-6xl mb-4">🎥</div>
                  <button 
                    onClick={startCall}
                    className="btn-primary"
                  >
                    Démarrer l&apos;appel vidéo
                  </button>
                </div>
              )}
              
              {status === 'connecting' && (
                <div className="text-white text-center">
                  <div className="animate-pulse text-4xl mb-4">📞</div>
                  <p>Connexion en cours...</p>
                </div>
              )}
              
              {status === 'connected' && (
                <>
                  <div className="absolute inset-0 bg-gray-800 rounded-lg">
                    <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded-lg"></div>
                  </div>
                  <div className="absolute top-4 left-4 text-white">
                    <p className="text-sm">Technicien: Marc</p>
                    <p className="text-xs opacity-80">En ligne</p>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                    <button className="bg-red-600 text-white p-3 rounded-full">
                      📞
                    </button>
                    <button className="bg-gray-600 text-white p-3 rounded-full">
                      🎤
                    </button>
                    <button className="bg-gray-600 text-white p-3 rounded-full">
                      📹
                    </button>
                  </div>
                </>
              )}
            </div>

            {status === 'connected' && (
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 Conseil: Approchez la caméra de l&apos;impact pour une meilleure évaluation
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}