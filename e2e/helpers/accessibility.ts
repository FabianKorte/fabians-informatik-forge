import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Runs accessibility scan on the current page
 * @param page - Playwright page object
 * @param options - Configuration options for the scan
 * @returns Accessibility scan results
 */
export async function checkAccessibility(
  page: Page,
  options: {
    includeTags?: string[];
    excludeTags?: string[];
    disableRules?: string[];
    enableRules?: string[];
  } = {}
) {
  const {
    includeTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    excludeTags = [],
    disableRules = [],
    enableRules = [],
  } = options;

  const builder = new AxeBuilder({ page }).withTags(includeTags);

  if (excludeTags.length > 0) {
    builder.excludeTags(excludeTags);
  }

  if (disableRules.length > 0) {
    builder.disableRules(disableRules);
  }

  if (enableRules.length > 0) {
    builder.withRules(enableRules);
  }

  const results = await builder.analyze();

  // Log violations for debugging
  if (results.violations.length > 0) {
    console.log('\n=== Accessibility Violations ===');
    results.violations.forEach((violation) => {
      console.log(`\n${violation.id} (${violation.impact})`);
      console.log(`Description: ${violation.description}`);
      console.log(`Help: ${violation.helpUrl}`);
      console.log(`Affected elements: ${violation.nodes.length}`);
      
      violation.nodes.forEach((node, index) => {
        console.log(`\n  Node ${index + 1}:`);
        console.log(`    HTML: ${node.html}`);
        console.log(`    Target: ${node.target.join(' > ')}`);
        console.log(`    Message: ${node.failureSummary}`);
      });
    });
    console.log('\n================================\n');
  }

  return results;
}

/**
 * Asserts that there are no accessibility violations
 * @param page - Playwright page object
 * @param options - Configuration options for the scan
 */
export async function assertNoA11yViolations(
  page: Page,
  options?: Parameters<typeof checkAccessibility>[1]
) {
  const results = await checkAccessibility(page, options);
  
  if (results.violations.length > 0) {
    const violationsSummary = results.violations.map(v => 
      `${v.id} (${v.impact}): ${v.nodes.length} affected elements`
    ).join('\n');
    
    throw new Error(
      `Found ${results.violations.length} accessibility violations:\n${violationsSummary}`
    );
  }
}

/**
 * Checks for specific WCAG criteria
 */
export const WCAG_RULES = {
  // Level A
  imageAlt: ['image-alt'],
  formLabel: ['label', 'form-field-multiple-labels'],
  headingStructure: ['heading-order', 'page-has-heading-one'],
  
  // Level AA
  colorContrast: ['color-contrast'],
  
  // ARIA
  ariaAttributes: ['aria-allowed-attr', 'aria-required-attr', 'aria-valid-attr', 'aria-roles'],
  
  // Keyboard
  keyboard: ['focus-order-semantics', 'tabindex'],
  
  // Forms
  forms: ['label', 'form-field-multiple-labels', 'select-name'],
  
  // Links
  links: ['link-name', 'link-in-text-block'],
};

/**
 * Test keyboard navigation
 * @param page - Playwright page object
 */
export async function testKeyboardNavigation(page: Page) {
  // Get all focusable elements
  const focusableElements = await page.locator(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ).all();

  console.log(`Found ${focusableElements.length} focusable elements`);

  // Test Tab navigation
  for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    console.log(`Tab ${i + 1}: Focused element is ${focused}`);
  }

  // Test Shift+Tab navigation
  for (let i = 0; i < Math.min(5, focusableElements.length); i++) {
    await page.keyboard.press('Shift+Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    console.log(`Shift+Tab ${i + 1}: Focused element is ${focused}`);
  }
}
