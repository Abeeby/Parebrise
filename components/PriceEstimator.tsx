'use client'
import { useState } from 'react'

export default function PriceEstimator() {
  const [photo, setPhoto] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
      analyzePhoto()
    }
  }

  const analyzePhoto = () => {
    setAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        damage: 'Impact de 2.5cm avec fissure',
        repairType: 'Réparation possible',
        estimatedPrice: 'CHF 120-150',
        urgency: 'Intervention recommandée sous 48h'
      })
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4">🤖 Estimation IA par photo</h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className="cursor-pointer">
          <div className="text-4xl mb-2">📸</div>
          <p className="text-gray-600">Cliquez ou glissez une photo du dégât</p>
        </label>
      </div>

      {analyzing && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2">Analyse en cours par IA...</p>
        </div>
      )}

      {result && !analyzing && (
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Résultat de l&apos;analyse :</h4>
          <ul className="space-y-2 text-sm">
            <li>🔍 <strong>Dégât détecté :</strong> {result.damage}</li>
            <li>🔧 <strong>Type d&apos;intervention :</strong> {result.repairType}</li>
            <li>💰 <strong>Prix estimé :</strong> {result.estimatedPrice}</li>
            <li>⚡ <strong>Urgence :</strong> {result.urgency}</li>
          </ul>
          <button className="btn-primary w-full mt-4">
            Prendre RDV maintenant
          </button>
        </div>
      )}
    </div>
  )
}