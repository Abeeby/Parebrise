'use client'

import React from 'react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console in development
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-gray-600 mb-4">
          Nous rencontrons actuellement un problème technique. Veuillez réessayer dans quelques instants.
        </p>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p className="text-sm text-gray-700 font-mono">
            {error.digest ? `Code d'erreur: ${error.digest}` : 'Erreur interne du serveur'}
          </p>
        </div>
        <button
          onClick={reset}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}