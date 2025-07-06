'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2, Calculator, Check, AlertCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PriceCalculationResponse } from '@/app/api/calculate-price/route';

// Étendre Window pour gtag
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

interface PriceCalculatorProps {
  className?: string;
  onPriceCalculated?: (price: number) => void;
}

interface BrandModel {
  value: string;
  label: string;
  models: { value: string; label: string; }[];
}

export default function PriceCalculator({ className, onPriceCalculated }: PriceCalculatorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<PriceCalculationResponse['data'] | null>(null);
  
  // États du formulaire
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serviceType, setServiceType] = useState('replacement');
  const [hasADAS, setHasADAS] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  
  // Options (normalement chargées depuis l'API)
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [availableModels, setAvailableModels] = useState<{ value: string; label: string; }[]>([]);

  // Charger les options au montage
  useEffect(() => {
    fetch('/api/calculate-price')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBrands(data.data.brands);
        }
      })
      .catch(console.error);
  }, []);

  // Mettre à jour les modèles quand la marque change
  const handleBrandChange = (value: string) => {
    setBrand(value);
    setModel(''); // Reset model
    const selectedBrand = brands.find(b => b.value === value);
    setAvailableModels(selectedBrand?.models || []);
  };

  // Calculer le prix
  const calculatePrice = async () => {
    if (!brand || !model) {
      setError('Veuillez sélectionner une marque et un modèle');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/calculate-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand,
          model,
          serviceType,
          hasADAS,
          isUrgent,
        }),
      });

      const data: PriceCalculationResponse = await response.json();

      if (data.success && data.data) {
        setResult(data.data);
        onPriceCalculated?.(data.data.finalPrice);
        
        // Track l'événement GA4
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'price_calculated', {
            brand,
            model,
            service_type: serviceType,
            final_price: data.data.finalPrice,
            has_adas: hasADAS,
            is_urgent: isUrgent,
          });
        }
      } else {
        setError(data.error || 'Erreur lors du calcul');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
      console.error('Price calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calculateur de Prix Instantané
        </CardTitle>
        <CardDescription>
          Obtenez votre devis en 30 secondes
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Sélection marque */}
        <div className="space-y-2">
          <Label htmlFor="brand">Marque du véhicule</Label>
          <Select value={brand} onValueChange={handleBrandChange}>
            <SelectTrigger id="brand">
              <SelectValue placeholder="Sélectionner une marque" />
            </SelectTrigger>
            <SelectContent>
              {brands.map(b => (
                <SelectItem key={b.value} value={b.value}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sélection modèle */}
        <div className="space-y-2">
          <Label htmlFor="model">Modèle</Label>
          <Select value={model} onValueChange={setModel} disabled={!brand}>
            <SelectTrigger id="model">
              <SelectValue placeholder="Sélectionner un modèle" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map(m => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type de service */}
        <div className="space-y-2">
          <Label htmlFor="service">Type de service</Label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger id="service">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="replacement">Remplacement complet</SelectItem>
              <SelectItem value="repair">Réparation impact</SelectItem>
              <SelectItem value="adas">Remplacement avec calibrage ADAS</SelectItem>
              <SelectItem value="headlight">Rénovation phares</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="adas" 
              checked={hasADAS} 
              onCheckedChange={(checked) => setHasADAS(checked as boolean)}
              disabled={serviceType === 'adas'}
            />
            <Label 
              htmlFor="adas" 
              className="text-sm font-normal cursor-pointer"
            >
              Mon véhicule a des capteurs ADAS (aide à la conduite)
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="urgent" 
              checked={isUrgent} 
              onCheckedChange={(checked) => setIsUrgent(checked as boolean)}
            />
            <Label 
              htmlFor="urgent" 
              className="text-sm font-normal cursor-pointer"
            >
              Intervention urgente (sous 2h) +20%
            </Label>
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Bouton calculer */}
        <Button 
          onClick={calculatePrice} 
          disabled={loading || !brand || !model}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calcul en cours...
            </>
          ) : (
            'Calculer mon prix'
          )}
        </Button>

        {/* Résultat */}
        {result && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Votre prix</p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {result.finalPrice} CHF
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  <Check className="inline h-4 w-4 mr-1" />
                  Économisez {result.savings} CHF vs concurrents
                </p>
              </div>
            </div>

            {/* Détails */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service de base</span>
                <span>{result.breakdown.service} CHF</span>
              </div>
              
              {result.breakdown.adas && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Calibrage ADAS</span>
                  <span>+{result.breakdown.adas} CHF</span>
                </div>
              )}
              
              {result.breakdown.urgency && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supplément urgence</span>
                  <span>+{result.breakdown.urgency} CHF</span>
                </div>
              )}
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Prix concurrent</span>
                  <span className="line-through text-muted-foreground">
                    {result.competitorPrice} CHF
                  </span>
                </div>
              </div>
            </div>

            {/* Infos supplémentaires */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-3 bg-muted rounded">
                <p className="text-sm font-medium flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4" />
                  Durée
                </p>
                <p className="text-sm text-muted-foreground">{result.estimatedDuration}</p>
                {result.estimatedTime && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ({result.estimatedTime.min}-{result.estimatedTime.max} min)
                  </p>
                )}
              </div>
              <div className="text-center p-3 bg-muted rounded">
                <p className="text-sm font-medium">Garantie</p>
                <p className="text-sm text-muted-foreground">{result.warranty}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-2 pt-4">
              <Button variant="default" className="flex-1" asChild>
                <a href="tel:+41789999999">
                  📞 Réserver maintenant
                </a>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href="https://wa.me/41789999999" target="_blank" rel="noopener">
                  💬 WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 