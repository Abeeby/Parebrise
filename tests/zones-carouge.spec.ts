import { test, expect } from '@playwright/test';

test.describe('Page Zone Carouge', () => {
  test.beforeEach(async ({ page }) => {
    // Naviguer vers la page Carouge
    await page.goto('/fr/zones/pare-brise-carouge');
  });

  test('doit charger la page avec le bon titre H1', async ({ page }) => {
    // Vérifier que la page se charge
    await expect(page).toHaveURL(/.*zones\/pare-brise-carouge/);
    
    // Vérifier le titre H1
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Remplacement et Réparation de Pare-brise à Carouge');
  });

  test('doit avoir un CTA principal cliquable', async ({ page }) => {
    // Trouver le bouton CTA principal
    const ctaButton = page.getByRole('link', { name: /devis immédiat/i });
    
    // Vérifier qu'il est visible
    await expect(ctaButton).toBeVisible();
    
    // Vérifier qu'il est cliquable
    await expect(ctaButton).toBeEnabled();
    
    // Vérifier l'attribut href
    const href = await ctaButton.getAttribute('href');
    expect(href).toBe('#devis');
  });

  test('doit afficher la section FAQ', async ({ page }) => {
    // Vérifier que la section FAQ existe
    const faqSection = page.locator('text=Questions fréquentes');
    await expect(faqSection).toBeVisible();
    
    // Vérifier qu'il y a au moins 3 questions
    const faqItems = page.locator('[data-testid="accordion-item"], [role="button"]:has-text("Q")');
    await expect(faqItems).toHaveCount(3);
  });

  test('doit avoir les métadonnées SEO correctes', async ({ page }) => {
    // Vérifier le title
    await expect(page).toHaveTitle(/Pare-brise Carouge.*PareBrise Genève Pro/);
    
    // Vérifier la meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      /Service de remplacement et réparation de pare-brise à Carouge/
    );
  });

  test('doit afficher le témoignage client', async ({ page }) => {
    // Vérifier qu'un témoignage est visible
    const testimonial = page.locator('text=Antoine Rossi');
    await expect(testimonial).toBeVisible();
    
    // Vérifier les étoiles de notation
    const stars = page.locator('.fill-yellow-400');
    await expect(stars).toHaveCount(5);
  });

  test('doit avoir les CTAs de contact fonctionnels', async ({ page }) => {
    // Vérifier le bouton téléphone
    const phoneButton = page.getByRole('link', { name: /appeler maintenant/i });
    await expect(phoneButton).toBeVisible();
    await expect(phoneButton).toHaveAttribute('href', 'tel:+41789999999');
    
    // Vérifier le bouton WhatsApp
    const whatsappButton = page.getByRole('link', { name: /whatsapp/i });
    await expect(whatsappButton).toBeVisible();
    await expect(whatsappButton).toHaveAttribute('href', /wa\.me/);
  });

  test('doit afficher la liste des services', async ({ page }) => {
    // Vérifier que les services sont visibles
    await expect(page.locator('text=Intervention parking souterrain')).toBeVisible();
    await expect(page.locator('text=Service entreprises')).toBeVisible();
    await expect(page.locator('text=Horaires flexibles')).toBeVisible();
  });
});

// Test de performance basique
test('doit charger rapidement', async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('/fr/zones/pare-brise-carouge', {
    waitUntil: 'domcontentloaded'
  });
  
  const loadTime = Date.now() - startTime;
  
  // La page devrait charger en moins de 3 secondes
  expect(loadTime).toBeLessThan(3000);
}); 