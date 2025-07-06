# Checklist Accessibilité WCAG - Niveau AA + AAA

## 1. Perceptible

### 1.1 Alternatives textuelles (Niveau A)
- [x] Toutes les images ont un attribut `alt` descriptif
- [x] Les images décoratives ont `alt=""` 
- [x] Les icônes informatives ont un texte alternatif
- [x] Les boutons avec icônes ont `aria-label`

### 1.2 Médias temporels (Niveau AA)
- [ ] Les vidéos ont des sous-titres
- [ ] Les vidéos ont une transcription textuelle
- [ ] L'audio a une transcription

### 1.3 Adaptable (Niveau AA)
- [x] Structure HTML sémantique correcte (header, nav, main, footer)
- [x] Utilisation appropriée des balises H1-H6
- [x] Les tableaux ont des en-têtes `<th>`
- [x] Les formulaires ont des `<label>` associés
- [x] Ordre de lecture logique sans CSS

### 1.4 Distinguable (Niveau AA + AAA)
- [x] Ratio de contraste texte normal ≥ 4.5:1 (AA)
- [x] Ratio de contraste gros texte ≥ 3:1 (AA)
- [x] Ratio de contraste amélioré ≥ 7:1 (AAA)
- [x] Pas d'information véhiculée uniquement par la couleur
- [x] Texte redimensionnable jusqu'à 200% sans perte
- [x] Espacement du texte ajustable (AAA)

## 2. Utilisable

### 2.1 Accessibilité au clavier (Niveau AA)
- [x] Tout le contenu accessible au clavier
- [x] Pas de piège au clavier
- [x] Ordre de tabulation logique
- [x] Focus visible sur tous les éléments interactifs
- [x] Raccourcis clavier documentés

### 2.2 Temps suffisant (Niveau AA)
- [x] Possibilité d'étendre les limites de temps
- [x] Pas de contenu qui clignote plus de 3 fois/seconde
- [x] Possibilité de mettre en pause les animations

### 2.3 Crises et réactions physiques (Niveau AAA)
- [x] Pas de contenu susceptible de provoquer des crises
- [x] Animations désactivables via `prefers-reduced-motion`

### 2.4 Navigable (Niveau AA + AAA)
- [x] Skip links pour passer au contenu principal
- [x] Titre de page unique et descriptif
- [x] Ordre de focus logique
- [x] Liens explicites (pas de "cliquez ici")
- [x] Breadcrumbs présents
- [x] Multiple moyens de navigation (AAA)
- [x] Titres de sections descriptifs (AAA)

### 2.5 Modalités d'entrée (Niveau AA)
- [x] Cibles tactiles minimum 44x44 pixels
- [x] Gestes complexes ont des alternatives
- [x] Annulation possible des actions

## 3. Compréhensible

### 3.1 Lisible (Niveau AA + AAA)
- [x] Langue de la page déclarée (`lang="fr-CH"`)
- [x] Changements de langue signalés
- [x] Niveau de lecture approprié (AAA)
- [x] Définitions pour jargon technique (AAA)
- [x] Abréviations expliquées (AAA)

### 3.2 Prévisible (Niveau AA)
- [x] Navigation cohérente sur toutes les pages
- [x] Identification cohérente des composants
- [x] Pas de changement de contexte automatique
- [x] Instructions claires pour les formulaires

### 3.3 Assistance à la saisie (Niveau AA)
- [x] Messages d'erreur clairs et spécifiques
- [x] Labels et instructions pour tous les champs
- [x] Suggestions de correction pour les erreurs
- [x] Prévention des erreurs pour actions importantes

## 4. Robuste

### 4.1 Compatible (Niveau AA)
- [x] HTML valide sans erreurs critiques
- [x] WAI-ARIA correctement implémenté
- [x] Compatible avec lecteurs d'écran
- [x] Messages de statut annoncés via `aria-live`

## Implémentation Spécifique

### Composants Accessibles

#### Widget WhatsApp
```html
<button 
  type="button" 
  aria-label="Contacter sur WhatsApp, réponse en moins de 2 minutes"
  class="whatsapp-widget"
>
  <span class="visually-hidden">Nouveau message</span>
  💬 Devis WhatsApp
  <span class="response-time" aria-live="polite">Réponse < 2 min</span>
</button>
```

#### Calendrier de Réservation
```html
<div role="region" aria-label="Sélection de date et heure">
  <fieldset>
    <legend>Choisir un créneau horaire</legend>
    <div role="group" aria-describedby="calendar-instructions">
      <p id="calendar-instructions" class="visually-hidden">
        Utilisez les flèches pour naviguer entre les dates
      </p>
      <!-- Slots avec aria-label dynamiques -->
    </div>
  </fieldset>
</div>
```

#### Calculateur de Prix
```html
<form role="form" aria-label="Calculateur de prix pare-brise">
  <div role="group" aria-labelledby="calculator-heading">
    <h3 id="calculator-heading">Obtenez votre prix instantanément</h3>
    
    <label for="car-brand">
      Marque du véhicule
      <span aria-label="requis">*</span>
    </label>
    <select id="car-brand" required aria-required="true">
      <option value="">Sélectionnez une marque</option>
      <!-- Options -->
    </select>
    
    <div aria-live="polite" aria-atomic="true">
      <p class="price-result">Votre prix estimé : <strong>CHF 450</strong></p>
    </div>
  </div>
</form>
```

### CSS Accessibilité

```css
/* Classe pour masquer visuellement mais garder pour lecteurs d'écran */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus visible amélioré */
:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

/* Respect des préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Mode contraste élevé */
@media (prefers-contrast: high) {
  :root {
    --primary: #0033aa;
    --text-primary: #000000;
    --background: #ffffff;
  }
}
```

### JavaScript Accessible

```javascript
// Gestion du focus trap dans modales
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) { // shift + tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else { // tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// Annonces pour lecteurs d'écran
function announceToScreenReader(message, priority = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.classList.add('visually-hidden');
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
```

## Tests d'Accessibilité

### Outils de Test
1. **axe DevTools** : Extension Chrome/Firefox
2. **WAVE** : Web Accessibility Evaluation Tool
3. **NVDA** : Lecteur d'écran gratuit (Windows)
4. **VoiceOver** : Lecteur d'écran (macOS/iOS)
5. **Lighthouse** : Audit d'accessibilité intégré

### Checklist de Tests Manuels
- [ ] Navigation complète au clavier uniquement
- [ ] Test avec lecteur d'écran
- [ ] Zoom 200% sans défilement horizontal
- [ ] Désactivation CSS pour vérifier l'ordre
- [ ] Test des formulaires avec erreurs
- [ ] Vérification des contrastes avec outils
- [ ] Test sur mobile avec VoiceOver/TalkBack 