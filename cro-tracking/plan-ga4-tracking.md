# Plan CRO & Tracking GA4

## Matrice d'Événements GA4

### Événements de Conversion Principaux

| Événement | Déclencheur | Paramètres | Valeur |
|-----------|------------|------------|--------|
| `booking_completed` | Confirmation réservation | `service_type`, `booking_date`, `time_slot` | CHF estimé |
| `quote_requested` | Soumission formulaire devis | `vehicle_brand`, `vehicle_model`, `service_type` | CHF estimé |
| `whatsapp_contact` | Clic WhatsApp | `page_location`, `widget_type` | 100 CHF |
| `phone_call` | Clic téléphone | `page_location`, `phone_number` | 150 CHF |
| `insurance_claim_started` | Début process assurance | `insurance_company`, `claim_type` | 300 CHF |

### Événements d'Engagement

| Événement | Déclencheur | Paramètres |
|-----------|------------|------------|
| `calculator_used` | Utilisation calculateur prix | `brand`, `model`, `calculated_price` |
| `gallery_viewed` | Vue galerie avant-après | `gallery_type`, `images_viewed` |
| `faq_expanded` | Ouverture FAQ | `question_id`, `page_location` |
| `video_play` | Lecture vidéo | `video_title`, `video_duration` |
| `scroll_depth` | Scroll 25/50/75/90% | `percent_scrolled` |
| `time_on_page` | Temps passé > 30s/60s/180s | `time_threshold` |

### Événements de Navigation

| Événement | Déclencheur | Paramètres |
|-----------|------------|------------|
| `service_page_view` | Vue page service | `service_name`, `entry_source` |
| `local_page_view` | Vue page quartier | `location_name`, `postal_code` |
| `blog_article_read` | Lecture article blog | `article_title`, `read_time` |
| `internal_search` | Recherche interne | `search_term`, `results_count` |

### Configuration Enhanced Ecommerce

```javascript
// Exemple configuration GA4
gtag('event', 'begin_checkout', {
  currency: 'CHF',
  value: 450.00,
  items: [{
    item_id: 'WINDSHIELD_REPLACEMENT',
    item_name: 'Remplacement Pare-brise',
    item_category: 'Services',
    item_brand: 'Audi',
    price: 450.00,
    quantity: 1
  }]
});

// Tracking formulaire par étapes
gtag('event', 'form_progress', {
  form_name: 'devis_pare_brise',
  form_step: 2,
  form_step_name: 'vehicle_info'
});
```

## Scénarios A/B Test

### Test A/B #1 : CTA Principal Hero

**Hypothèse** : Un CTA plus spécifique convertit mieux qu'un CTA générique

**Variantes** :
- **Control** : "Demander un Devis"
- **Variant A** : "Devis en 2 Minutes"
- **Variant B** : "Voir les Prix →"

**Métriques** :
- CTR du bouton
- Taux de complétion formulaire
- Taux de conversion finale

**Implementation** :
```javascript
// Google Optimize ou custom A/B
const variants = {
  control: { text: "Demander un Devis", class: "cta-primary" },
  variantA: { text: "Devis en 2 Minutes ⏱️", class: "cta-primary cta-timed" },
  variantB: { text: "Voir les Prix →", class: "cta-primary cta-price" }
};

// Attribution variante
const selectedVariant = getABTestVariant('hero_cta_test');
updateCTA(selectedVariant);

// Tracking
gtag('event', 'experiment_impression', {
  experiment_id: 'hero_cta_test_2024',
  variant_id: selectedVariant
});
```

### Test A/B #2 : Widget WhatsApp Position

**Hypothèse** : Position et timing du widget WhatsApp impactent les conversions

**Variantes** :
- **Control** : Bottom-right fixe
- **Variant A** : Apparition après 15s + pulse
- **Variant B** : Slide-in après scroll 50%

**Métriques** :
- Taux de clic WhatsApp
- Temps avant premier clic
- Conversions WhatsApp

**Implementation** :
```javascript
// Variant A - Delayed with pulse
if (variant === 'delayedPulse') {
  setTimeout(() => {
    whatsappWidget.show();
    whatsappWidget.addPulseAnimation();
    gtag('event', 'whatsapp_widget_shown', {
      variant: 'delayed_pulse',
      delay_seconds: 15
    });
  }, 15000);
}

// Variant B - Scroll triggered
if (variant === 'scrollTrigger') {
  window.addEventListener('scroll', () => {
    if (getScrollPercent() >= 50 && !whatsappShown) {
      whatsappWidget.slideIn();
      whatsappShown = true;
      gtag('event', 'whatsapp_widget_shown', {
        variant: 'scroll_trigger',
        scroll_percent: 50
      });
    }
  });
}
```

## Configuration GTM (Google Tag Manager)

### Variables Personnalisées

```javascript
// Variable : Service Type
function() {
  const path = window.location.pathname;
  if (path.includes('remplacement')) return 'replacement';
  if (path.includes('reparation')) return 'repair';
  if (path.includes('calibrage')) return 'adas';
  return 'other';
}

// Variable : User Intent Score
function() {
  let score = 0;
  if ({{Page Path}}.includes('urgence')) score += 30;
  if ({{Page Path}}.includes('devis')) score += 20;
  if ({{Referrer}}.includes('google')) score += 10;
  if ({{Time on Site}} > 60) score += 15;
  return score;
}
```

### Déclencheurs Avancés

```javascript
// Déclencheur : High Intent User
// Conditions :
// - Intent Score > 40
// - OU Page Views > 3
// - OU Time on Site > 120s

// Déclencheur : Exit Intent
// Conditions :
// - Mouse Y < 20px
// - Time on Page > 10s
// - No conversion events fired
```

## Tableaux de Bord Recommandés

### Dashboard Conversion
- Entonnoir de conversion complet
- Taux de conversion par source
- Valeur moyenne par conversion
- Top converting pages

### Dashboard Engagement  
- Scroll depth par page
- Temps moyen par section
- Interactions par session
- Bounce rate par device

### Dashboard Local SEO
- Conversions par quartier
- Performance pages locales
- Click-to-call par zone
- Google My Business insights

## Scripts de Tracking Avancé

```javascript
// Enhanced Link Attribution
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link) {
    gtag('event', 'link_click', {
      link_text: link.textContent,
      link_url: link.href,
      link_position: getLinkPosition(link),
      outbound: link.hostname !== location.hostname
    });
  }
});

// Form Field Timing
const formTimings = {};
document.querySelectorAll('input, select').forEach(field => {
  field.addEventListener('focus', () => {
    formTimings[field.name] = { start: Date.now() };
  });
  
  field.addEventListener('blur', () => {
    if (formTimings[field.name]) {
      const duration = Date.now() - formTimings[field.name].start;
      gtag('event', 'form_field_interaction', {
        field_name: field.name,
        interaction_time: duration,
        field_completed: field.value.length > 0
      });
    }
  });
});

// Rage Click Detection
let clickCount = 0;
let clickTimer;
document.addEventListener('click', function(e) {
  clickCount++;
  clearTimeout(clickTimer);
  
  clickTimer = setTimeout(() => {
    if (clickCount >= 3) {
      gtag('event', 'rage_click', {
        click_count: clickCount,
        target_element: e.target.tagName,
        page_section: getPageSection(e.target)
      });
    }
    clickCount = 0;
  }, 1000);
});
``` 