import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schéma de validation avec enum pour les marques
const BrandEnum = z.enum([
  'audi', 'bmw', 'mercedes', 'volkswagen', 'tesla', 'porsche',
  // Nouvelles marques préparées
  'alfaromeo', 'toyota', 'volvo', 'suzuki', 'subaru', 'lexus'
]);

const calculatePriceSchema = z.object({
  brand: BrandEnum,
  model: z.string().min(1, 'Le modèle est requis'),
  serviceType: z.enum(['replacement', 'repair', 'adas', 'headlight']),
  hasADAS: z.boolean().optional(),
  isUrgent: z.boolean().optional(),
  postalCode: z.string().optional(),
});

// Types
export type PriceCalculationRequest = z.infer<typeof calculatePriceSchema>;
export type SupportedBrand = z.infer<typeof BrandEnum>;

export interface PriceCalculationResponse {
  success: boolean;
  data?: {
    basePrice: number;
    finalPrice: number;
    savings: number;
    competitorPrice: number;
    breakdown: {
      service: number;
      adas?: number;
      urgency?: number;
      discount?: number;
    };
    estimatedDuration: string;
    estimatedTime: {
      min: number;
      max: number;
    };
    warranty: string;
  };
  error?: string;
}

// Base de prix par marque/modèle (en CHF)
const PRICE_DATABASE = {
  audi: {
    a3: { replacement: 380, repair: 89, headlight: 120 },
    a4: { replacement: 450, repair: 89, headlight: 140 },
    q5: { replacement: 550, repair: 89, headlight: 160 },
    q7: { replacement: 680, repair: 89, headlight: 180 },
  },
  bmw: {
    '1': { replacement: 380, repair: 89, headlight: 120 },
    '3': { replacement: 450, repair: 89, headlight: 140 },
    x3: { replacement: 550, repair: 89, headlight: 160 },
    x5: { replacement: 680, repair: 89, headlight: 180 },
  },
  mercedes: {
    a: { replacement: 400, repair: 89, headlight: 130 },
    c: { replacement: 480, repair: 89, headlight: 150 },
    glc: { replacement: 580, repair: 89, headlight: 170 },
    gle: { replacement: 720, repair: 89, headlight: 190 },
  },
  volkswagen: {
    golf: { replacement: 350, repair: 89, headlight: 110 },
    passat: { replacement: 420, repair: 89, headlight: 130 },
    tiguan: { replacement: 520, repair: 89, headlight: 150 },
    touareg: { replacement: 650, repair: 89, headlight: 170 },
  },
  tesla: {
    model3: { replacement: 580, repair: 120, headlight: 200 },
    modely: { replacement: 680, repair: 120, headlight: 220 },
    models: { replacement: 980, repair: 150, headlight: 280 },
    modelx: { replacement: 1080, repair: 150, headlight: 300 },
  },
  porsche: {
    cayenne: { replacement: 780, repair: 120, headlight: 250 },
    macan: { replacement: 680, repair: 120, headlight: 220 },
    '911': { replacement: 880, repair: 150, headlight: 300 },
    panamera: { replacement: 980, repair: 150, headlight: 320 },
  },
  // Nouvelles marques (à compléter avec les modèles)
  alfaromeo: {
    giulia: { replacement: 480, repair: 89, headlight: 150 },
    stelvio: { replacement: 580, repair: 89, headlight: 170 },
  },
  toyota: {
    yaris: { replacement: 320, repair: 89, headlight: 100 },
    corolla: { replacement: 380, repair: 89, headlight: 120 },
    rav4: { replacement: 520, repair: 89, headlight: 150 },
    landcruiser: { replacement: 720, repair: 89, headlight: 190 },
  },
  volvo: {
    v40: { replacement: 420, repair: 89, headlight: 130 },
    xc40: { replacement: 520, repair: 89, headlight: 150 },
    xc60: { replacement: 620, repair: 89, headlight: 170 },
    xc90: { replacement: 780, repair: 89, headlight: 200 },
  },
  suzuki: {
    swift: { replacement: 300, repair: 89, headlight: 90 },
    vitara: { replacement: 420, repair: 89, headlight: 130 },
    jimny: { replacement: 380, repair: 89, headlight: 120 },
  },
  subaru: {
    impreza: { replacement: 380, repair: 89, headlight: 120 },
    xv: { replacement: 480, repair: 89, headlight: 140 },
    forester: { replacement: 520, repair: 89, headlight: 150 },
    outback: { replacement: 580, repair: 89, headlight: 160 },
  },
  lexus: {
    ct: { replacement: 520, repair: 120, headlight: 180 },
    nx: { replacement: 680, repair: 120, headlight: 200 },
    rx: { replacement: 780, repair: 120, headlight: 220 },
    ls: { replacement: 980, repair: 150, headlight: 280 },
  },
};

// Suppléments et options
const ADAS_CALIBRATION_PRICE = 180;
const URGENCY_SUPPLEMENT_PERCENT = 20; // 20% supplément urgence
const COMPETITOR_MARKUP_PERCENT = 25; // Nos prix sont 25% moins chers

// Durées estimées (en minutes)
const SERVICE_DURATIONS = {
  replacement: { text: '2 heures', min: 90, max: 120 },
  repair: { text: '30 minutes', min: 20, max: 40 },
  adas: { text: '45 minutes', min: 30, max: 60 },
  headlight: { text: '1 heure', min: 45, max: 75 },
};

// Garanties
const WARRANTIES = {
  replacement: 'Garantie à vie',
  repair: 'Garantie 2 ans',
  adas: 'Certification constructeur',
  headlight: 'Garantie 3 ans',
};

// POST /api/calculate-price
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const validationResult = calculatePriceSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: validationResult.error.errors[0].message 
        },
        { status: 400 }
      );
    }

    const { brand, model, serviceType, hasADAS, isUrgent } = validationResult.data;

    // Vérifier si la marque/modèle existe
    const brandPrices = PRICE_DATABASE[brand as keyof typeof PRICE_DATABASE];
    if (!brandPrices) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Marque non supportée' 
        },
        { status: 400 }
      );
    }

    const modelPrices = brandPrices[model.toLowerCase() as keyof typeof brandPrices];
    if (!modelPrices) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Modèle non supporté' 
        },
        { status: 400 }
      );
    }

    // Calculer le prix
    let basePrice = 0;
    let estimatedTime = SERVICE_DURATIONS.replacement; // Par défaut
    const breakdown: any = {};

    // Prix de base selon le service
    if (serviceType === 'replacement') {
      basePrice = modelPrices.replacement;
      breakdown.service = basePrice;
      estimatedTime = SERVICE_DURATIONS.replacement;
    } else if (serviceType === 'repair') {
      basePrice = modelPrices.repair;
      breakdown.service = basePrice;
      estimatedTime = SERVICE_DURATIONS.repair;
    } else if (serviceType === 'adas') {
      basePrice = modelPrices.replacement + ADAS_CALIBRATION_PRICE;
      breakdown.service = modelPrices.replacement;
      breakdown.adas = ADAS_CALIBRATION_PRICE;
      estimatedTime = {
        text: '2h45',
        min: SERVICE_DURATIONS.replacement.min + SERVICE_DURATIONS.adas.min,
        max: SERVICE_DURATIONS.replacement.max + SERVICE_DURATIONS.adas.max
      };
    } else if (serviceType === 'headlight') {
      basePrice = modelPrices.headlight;
      breakdown.service = basePrice;
      estimatedTime = SERVICE_DURATIONS.headlight;
    }

    // Ajouter ADAS si nécessaire
    if (hasADAS && serviceType === 'replacement') {
      basePrice += ADAS_CALIBRATION_PRICE;
      breakdown.adas = ADAS_CALIBRATION_PRICE;
      // Ajuster le temps estimé
      estimatedTime = {
        text: '2h45',
        min: SERVICE_DURATIONS.replacement.min + SERVICE_DURATIONS.adas.min,
        max: SERVICE_DURATIONS.replacement.max + SERVICE_DURATIONS.adas.max
      };
    }

    let finalPrice = basePrice;

    // Appliquer supplément urgence
    if (isUrgent) {
      const urgencyAmount = Math.round(basePrice * (URGENCY_SUPPLEMENT_PERCENT / 100));
      finalPrice += urgencyAmount;
      breakdown.urgency = urgencyAmount;
    }

    // Calculer le prix concurrent
    const competitorPrice = Math.round(finalPrice * (1 + COMPETITOR_MARKUP_PERCENT / 100));
    const savings = competitorPrice - finalPrice;

    // Log pour tracking analytics (en production, envoyer à GA4)
    console.log('Price calculation:', {
      brand,
      model,
      serviceType,
      finalPrice,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: {
        basePrice,
        finalPrice,
        savings,
        competitorPrice,
        breakdown,
        estimatedDuration: estimatedTime.text,
        estimatedTime: {
          min: estimatedTime.min,
          max: estimatedTime.max
        },
        warranty: WARRANTIES[serviceType],
      },
    });

  } catch (error) {
    console.error('Price calculation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors du calcul du prix' 
      },
      { status: 500 }
    );
  }
}

// GET /api/calculate-price - Retourner les options disponibles
export async function GET() {
  const brands = Object.keys(PRICE_DATABASE).map(brand => ({
    value: brand,
    label: brand.charAt(0).toUpperCase() + brand.slice(1),
    models: Object.keys(PRICE_DATABASE[brand as keyof typeof PRICE_DATABASE]).map(model => ({
      value: model,
      label: model.toUpperCase(),
    })),
  }));

  return NextResponse.json({
    success: true,
    data: {
      brands,
      serviceTypes: [
        { value: 'replacement', label: 'Remplacement complet' },
        { value: 'repair', label: 'Réparation impact' },
        { value: 'adas', label: 'Remplacement avec calibrage ADAS' },
        { value: 'headlight', label: 'Rénovation phares' },
      ],
      options: {
        hasADAS: 'Mon véhicule a des capteurs ADAS',
        isUrgent: 'Intervention urgente (sous 2h)',
      },
    },
  });
}