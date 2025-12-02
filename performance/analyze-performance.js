#!/usr/bin/env node

/**
 * Performance Analysis Script
 * Analyzes Lighthouse CI results and generates performance report
 */

const fs = require('fs');
const path = require('path');

const RESULTS_DIR = '.lighthouseci';
const THRESHOLDS = {
  performance: 80,
  accessibility: 90,
  bestPractices: 90,
  seo: 90,
  fcp: 2000,
  lcp: 2500,
  cls: 0.1,
  tbt: 300,
  si: 3000
};

function analyzeResults() {
  console.log('🔍 Analyzing Lighthouse CI Results...\n');

  if (!fs.existsSync(RESULTS_DIR)) {
    console.error('❌ No Lighthouse results found. Run lighthouse tests first.');
    process.exit(1);
  }

  const manifestPath = path.join(RESULTS_DIR, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('❌ No manifest.json found in results directory.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const results = [];

  for (const entry of manifest) {
    const reportPath = path.join(RESULTS_DIR, entry.jsonPath);
    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      results.push({
        url: entry.url,
        report
      });
    }
  }

  console.log('📊 Performance Report\n');
  console.log('='.repeat(80));

  let hasFailures = false;

  for (const { url, report } of results) {
    console.log(`\n🌐 ${url}`);
    console.log('-'.repeat(80));

    const categories = report.categories;
    const audits = report.audits;

    // Category Scores
    console.log('\n📈 Category Scores:');
    for (const [key, category] of Object.entries(categories)) {
      const score = Math.round(category.score * 100);
      const threshold = THRESHOLDS[key] || 0;
      const status = score >= threshold ? '✅' : '❌';
      
      if (score < threshold) hasFailures = true;
      
      console.log(`  ${status} ${category.title}: ${score}/100 (threshold: ${threshold})`);
    }

    // Core Web Vitals
    console.log('\n⚡ Core Web Vitals:');
    
    const metrics = {
      'First Contentful Paint': { audit: 'first-contentful-paint', threshold: THRESHOLDS.fcp, unit: 'ms' },
      'Largest Contentful Paint': { audit: 'largest-contentful-paint', threshold: THRESHOLDS.lcp, unit: 'ms' },
      'Cumulative Layout Shift': { audit: 'cumulative-layout-shift', threshold: THRESHOLDS.cls, unit: '' },
      'Total Blocking Time': { audit: 'total-blocking-time', threshold: THRESHOLDS.tbt, unit: 'ms' },
      'Speed Index': { audit: 'speed-index', threshold: THRESHOLDS.si, unit: 'ms' }
    };

    for (const [name, { audit, threshold, unit }] of Object.entries(metrics)) {
      const auditData = audits[audit];
      if (auditData) {
        const value = auditData.numericValue;
        const displayValue = auditData.displayValue;
        const status = value <= threshold ? '✅' : '❌';
        
        if (value > threshold) hasFailures = true;
        
        console.log(`  ${status} ${name}: ${displayValue} (threshold: ${threshold}${unit})`);
      }
    }

    // Opportunities
    const opportunities = Object.entries(audits)
      .filter(([_, audit]) => audit.details?.type === 'opportunity' && audit.numericValue > 0)
      .sort((a, b) => b[1].numericValue - a[1].numericValue)
      .slice(0, 5);

    if (opportunities.length > 0) {
      console.log('\n💡 Top Optimization Opportunities:');
      for (const [key, audit] of opportunities) {
        const savings = Math.round(audit.numericValue / 1000 * 10) / 10;
        console.log(`  • ${audit.title}: ~${savings}s potential savings`);
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  
  if (hasFailures) {
    console.log('\n❌ Performance tests failed. Some metrics are below thresholds.');
    process.exit(1);
  } else {
    console.log('\n✅ All performance tests passed!');
    process.exit(0);
  }
}

analyzeResults();
