'use client'
import { useState, useEffect } from 'react'

export default function WeatherAlert() {
  const [alert, setAlert] = useState({
    active: true,
    type: 'frost',
    message: 'Gel prévu cette nuit! Protégez votre pare-brise',
    tip: 'Couvrez votre pare-brise ou utilisez un dégivrant adapté'
  })

  return alert.active ? (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 text-center text-sm">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <span>⚠️</span>
        <span className="font-semibold">{alert.message}</span>
        <span className="hidden md:inline">- {alert.tip}</span>
        <button 
          onClick={() => setAlert({...alert, active: false})}
          className="ml-4 hover:opacity-80"
        >
          ✕
        </button>
      </div>
    </div>
  ) : null
}