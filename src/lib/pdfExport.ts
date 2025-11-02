import type { LearnModule } from '@/types/learn';

export async function exportModuleToPDF(module: LearnModule, categoryTitle: string) {
  // Create a printable HTML version
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Popup wurde blockiert');
  }

  let content = '';

  if (module.type === 'flashcards') {
    content = `
      <h2>${module.title}</h2>
      ${module.cards.map((card, idx) => `
        <div style="page-break-inside: avoid; margin-bottom: 20px; padding: 15px; border: 1px solid #ddd;">
          <h3>Karte ${idx + 1}</h3>
          <div style="margin-bottom: 10px;">
            <strong>Vorderseite:</strong><br/>
            ${card.front}
          </div>
          <div>
            <strong>Rückseite:</strong><br/>
            ${card.back}
          </div>
        </div>
      `).join('')}
    `;
  } else if (module.type === 'quiz') {
    content = `
      <h2>${module.title}</h2>
      ${module.questions.map((q, idx) => `
        <div style="page-break-inside: avoid; margin-bottom: 20px; padding: 15px; border: 1px solid #ddd;">
          <h3>Frage ${idx + 1}</h3>
          <p><strong>${q.question}</strong></p>
          <ol type="A">
            ${q.options.map((opt, i) => `
              <li style="${i === q.correctIndex ? 'color: green; font-weight: bold;' : ''}">${opt}</li>
            `).join('')}
          </ol>
          ${q.explanation ? `<p><em>Erklärung: ${q.explanation}</em></p>` : ''}
        </div>
      `).join('')}
    `;
  } else if (module.type === 'matching') {
    content = `
      <h2>${module.title}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Begriff</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Zuordnung</th>
          </tr>
        </thead>
        <tbody>
          ${module.pairs.map(pair => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${pair.left}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${pair.right}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else {
    content = `
      <h2>${module.title}</h2>
      <p>Dieser Modultyp unterstützt aktuell keinen PDF-Export.</p>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${categoryTitle} - ${module.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          color: #333;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
        }
        h2 {
          color: #666;
          margin-top: 30px;
        }
        h3 {
          color: #888;
        }
        @media print {
          body {
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <h1>${categoryTitle}</h1>
      ${content}
      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}