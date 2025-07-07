export default function FrenchHomePage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          PareBrise Genève Pro
        </h1>
        <p className="text-xl mb-8">
          Service professionnel de remplacement et réparation de pare-brise à Genève et environs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a 
            href="/fr/zones/pare-brise-carouge"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">Carouge</h2>
            <p>Service de pare-brise à Carouge</p>
          </a>
        </div>
      </div>
    </main>
  )
}