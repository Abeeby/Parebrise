// ===================================
// WIDGET WHATSAPP DYNAMIQUE
// ===================================

class WhatsAppWidget {
  constructor() {
    this.phoneNumber = '+41789999999';
    this.defaultMessage = 'Bonjour, j\'aimerais un devis pour mon pare-brise';
    this.init();
  }

  init() {
    this.createWidget();
    this.attachEventListeners();
    this.trackAnalytics();
  }

  createWidget() {
    const widget = document.createElement('div');
    widget.className = 'whatsapp-widget';
    widget.innerHTML = `
      <span class="online-status">En ligne</span>
      <button type="button" aria-label="Contacter sur WhatsApp">
        <span class="pulse-animation"></span>
        💬 Devis WhatsApp
        <span class="response-time">Réponse < 2 min</span>
      </button>
    `;
    document.body.appendChild(widget);
  }

  attachEventListeners() {
    const button = document.querySelector('.whatsapp-widget button');
    button.addEventListener('click', () => this.openWhatsApp());
  }

  openWhatsApp() {
    const message = encodeURIComponent(this.defaultMessage);
    const url = `https://wa.me/${this.phoneNumber}?text=${message}`;
    window.open(url, '_blank');
    
    // Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', {
        'event_category': 'engagement',
        'event_label': 'widget_flottant'
      });
    }
  }

  trackAnalytics() {
    // Observer pour tracker la visibilité
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('WhatsApp widget visible');
        }
      });
    });
    
    const widget = document.querySelector('.whatsapp-widget');
    if (widget) observer.observe(widget);
  }
}

// ===================================
// WIDGET CALENDRIER DE RÉSERVATION
// ===================================

class BookingCalendar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.selectedSlot = null;
    this.availableSlots = this.generateSlots();
    this.init();
  }

  generateSlots() {
    const slots = [];
    const now = new Date();
    const startHour = 7;
    const endHour = 19;
    
    for (let day = 0; day < 7; day++) {
      const date = new Date(now);
      date.setDate(date.getDate() + day);
      
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotTime = new Date(date);
          slotTime.setHours(hour, minute, 0, 0);
          
          if (slotTime > now) {
            slots.push({
              date: slotTime,
              available: Math.random() > 0.3 // Simulation disponibilité
            });
          }
        }
      }
    }
    
    return slots;
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.updateNextSlot();
  }

  render() {
    const html = `
      <div class="booking-widget">
        <h3>Réserver en 30 secondes</h3>
        <div class="calendar-grid">
          ${this.renderDays()}
        </div>
        <div class="time-slots" id="time-slots"></div>
        <p class="next-slot"></p>
        <button class="cta-primary" id="confirm-booking" disabled>
          Confirmer la réservation
        </button>
      </div>
    `;
    this.container.innerHTML = html;
  }

  renderDays() {
    const days = {};
    this.availableSlots.forEach(slot => {
      const dayKey = slot.date.toLocaleDateString('fr-CH');
      if (!days[dayKey]) {
        days[dayKey] = [];
      }
      days[dayKey].push(slot);
    });

    return Object.keys(days).slice(0, 7).map(day => {
      const date = new Date(day);
      const dayName = date.toLocaleDateString('fr-CH', { weekday: 'short' });
      const dayNumber = date.getDate();
      
      return `
        <div class="calendar-day" data-date="${day}">
          <div class="day-name">${dayName}</div>
          <div class="day-number">${dayNumber}</div>
        </div>
      `;
    }).join('');
  }

  attachEventListeners() {
    const days = this.container.querySelectorAll('.calendar-day');
    days.forEach(day => {
      day.addEventListener('click', () => this.selectDay(day.dataset.date));
    });

    const confirmBtn = this.container.querySelector('#confirm-booking');
    confirmBtn.addEventListener('click', () => this.confirmBooking());
  }

  selectDay(dateString) {
    const slots = this.availableSlots.filter(slot => 
      slot.date.toLocaleDateString('fr-CH') === dateString && slot.available
    );
    
    this.renderTimeSlots(slots);
  }

  renderTimeSlots(slots) {
    const container = this.container.querySelector('#time-slots');
    container.innerHTML = slots.map(slot => `
      <button class="time-slot ${!slot.available ? 'disabled' : ''}" 
              data-time="${slot.date.toISOString()}"
              ${!slot.available ? 'disabled' : ''}>
        ${slot.date.toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })}
      </button>
    `).join('');

    container.querySelectorAll('.time-slot:not(.disabled)').forEach(btn => {
      btn.addEventListener('click', () => this.selectSlot(btn.dataset.time));
    });
  }

  selectSlot(timeString) {
    this.selectedSlot = new Date(timeString);
    
    // Update UI
    this.container.querySelectorAll('.time-slot').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.time === timeString);
    });
    
    this.container.querySelector('#confirm-booking').disabled = false;
  }

  updateNextSlot() {
    const nextAvailable = this.availableSlots.find(slot => slot.available);
    if (nextAvailable) {
      const timeDiff = nextAvailable.date - new Date();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      const nextSlotElement = this.container.querySelector('.next-slot');
      if (hours === 0) {
        nextSlotElement.textContent = `Prochain créneau : dans ${minutes} minutes`;
      } else {
        nextSlotElement.textContent = `Prochain créneau : dans ${hours}h${minutes > 0 ? minutes : ''}`;
      }
    }
  }

  confirmBooking() {
    if (!this.selectedSlot) return;
    
    const bookingData = {
      date: this.selectedSlot.toISOString(),
      service: 'pare-brise',
      timestamp: new Date().toISOString()
    };
    
    // Simulation envoi réservation
    console.log('Réservation confirmée:', bookingData);
    
    // Show confirmation
    this.showConfirmation();
    
    // Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'booking_confirmed', {
        'event_category': 'conversion',
        'event_label': 'calendrier_widget',
        'value': 1
      });
    }
  }

  showConfirmation() {
    this.container.innerHTML = `
      <div class="booking-confirmation">
        <div class="success-icon">✅</div>
        <h3>Réservation confirmée !</h3>
        <p>Nous vous avons envoyé un SMS de confirmation.</p>
        <p>Date: ${this.selectedSlot.toLocaleDateString('fr-CH')}</p>
        <p>Heure: ${this.selectedSlot.toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })}</p>
        <button class="cta-primary" onclick="location.reload()">
          Nouvelle réservation
        </button>
      </div>
    `;
  }
}

// ===================================
// CALCULATEUR DE PRIX DYNAMIQUE
// ===================================

class PriceCalculator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.prices = {
      'audi': { 'a3': 380, 'a4': 450, 'q5': 550, 'q7': 680 },
      'bmw': { '1': 380, '3': 450, 'x3': 550, 'x5': 680 },
      'mercedes': { 'a': 400, 'c': 480, 'glc': 580, 'gle': 720 },
      'volkswagen': { 'golf': 350, 'passat': 420, 'tiguan': 520, 'touareg': 650 }
    };
    this.adasExtra = 180;
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const html = `
      <div class="price-calculator">
        <h3>Calculateur de prix instantané</h3>
        <select id="car-brand" required>
          <option value="">Sélectionnez la marque</option>
          <option value="audi">Audi</option>
          <option value="bmw">BMW</option>
          <option value="mercedes">Mercedes</option>
          <option value="volkswagen">Volkswagen</option>
        </select>
        
        <select id="car-model" disabled required>
          <option value="">Sélectionnez le modèle</option>
        </select>
        
        <select id="service-type" required>
          <option value="">Type de service</option>
          <option value="replacement">Remplacement complet</option>
          <option value="repair">Réparation impact</option>
          <option value="adas">Avec calibrage ADAS</option>
        </select>
        
        <div class="instant-quote" style="display: none;">
          <span class="price"></span>
          <span class="savings"></span>
        </div>
        
        <button class="cta-primary" id="request-quote" style="display: none;">
          Demander ce devis
        </button>
      </div>
    `;
    this.container.innerHTML = html;
  }

  attachEventListeners() {
    const brandSelect = this.container.querySelector('#car-brand');
    const modelSelect = this.container.querySelector('#car-model');
    const serviceSelect = this.container.querySelector('#service-type');
    
    brandSelect.addEventListener('change', () => this.updateModels());
    modelSelect.addEventListener('change', () => this.calculatePrice());
    serviceSelect.addEventListener('change', () => this.calculatePrice());
    
    const quoteBtn = this.container.querySelector('#request-quote');
    quoteBtn.addEventListener('click', () => this.requestQuote());
  }

  updateModels() {
    const brand = this.container.querySelector('#car-brand').value;
    const modelSelect = this.container.querySelector('#car-model');
    
    if (!brand) {
      modelSelect.disabled = true;
      modelSelect.innerHTML = '<option value="">Sélectionnez le modèle</option>';
      return;
    }
    
    modelSelect.disabled = false;
    const models = Object.keys(this.prices[brand] || {});
    
    modelSelect.innerHTML = `
      <option value="">Sélectionnez le modèle</option>
      ${models.map(model => `
        <option value="${model}">${model.toUpperCase()}</option>
      `).join('')}
    `;
  }

  calculatePrice() {
    const brand = this.container.querySelector('#car-brand').value;
    const model = this.container.querySelector('#car-model').value;
    const service = this.container.querySelector('#service-type').value;
    
    if (!brand || !model || !service) return;
    
    let basePrice = this.prices[brand][model];
    let finalPrice = basePrice;
    
    if (service === 'repair') {
      finalPrice = 89;
    } else if (service === 'adas') {
      finalPrice = basePrice + this.adasExtra;
    }
    
    const competitorPrice = Math.round(finalPrice * 1.25);
    const savings = competitorPrice - finalPrice;
    
    this.displayPrice(finalPrice, savings);
  }

  displayPrice(price, savings) {
    const quoteDiv = this.container.querySelector('.instant-quote');
    const priceSpan = quoteDiv.querySelector('.price');
    const savingsSpan = quoteDiv.querySelector('.savings');
    const quoteBtn = this.container.querySelector('#request-quote');
    
    priceSpan.textContent = `CHF ${price}`;
    savingsSpan.textContent = `Économisez ${savings} CHF vs concurrence`;
    
    quoteDiv.style.display = 'block';
    quoteBtn.style.display = 'block';
    
    // Animation
    quoteDiv.classList.add('price-reveal');
  }

  requestQuote() {
    const data = {
      brand: this.container.querySelector('#car-brand').value,
      model: this.container.querySelector('#car-model').value,
      service: this.container.querySelector('#service-type').value,
      timestamp: new Date().toISOString()
    };
    
    console.log('Devis demandé:', data);
    
    // Redirect to WhatsApp with pre-filled message
    const message = `Bonjour, j'aimerais confirmer le devis pour ${data.brand.toUpperCase()} ${data.model.toUpperCase()} - ${data.service}`;
    const whatsapp = new WhatsAppWidget();
    whatsapp.defaultMessage = message;
    whatsapp.openWhatsApp();
  }
}

// ===================================
// INITIALISATION AU CHARGEMENT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialiser le widget WhatsApp
  new WhatsAppWidget();
  
  // Initialiser le calendrier si présent
  if (document.getElementById('booking-calendar')) {
    new BookingCalendar('booking-calendar');
  }
  
  // Initialiser le calculateur si présent
  if (document.getElementById('price-calculator')) {
    new PriceCalculator('price-calculator');
  }
  
  // Initialiser AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
});

// ===================================
// TRACKING DES PERFORMANCES
// ===================================

window.addEventListener('load', () => {
  // Mesurer les Core Web Vitals
  if ('web-vital' in window) {
    function sendToAnalytics({name, delta, id}) {
      if (typeof gtag !== 'undefined') {
        gtag('event', name, {
          event_category: 'Web Vitals',
          event_label: id,
          value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          non_interaction: true
        });
      }
    }
    
    webVitals.getCLS(sendToAnalytics);
    webVitals.getFID(sendToAnalytics);
    webVitals.getLCP(sendToAnalytics);
  }
}); 