'use strict';
const futureEstimate = document.querySelector('#future-estimate');
if (futureEstimate) {
  const output = document.querySelector('#future-estimate-value');
  const result = document.querySelector('#future-vote-result');
  const button = document.querySelector('#future-reveal');
  const feedback = document.querySelector('#future-estimate-feedback');
  const describeEstimate = () => {
    const value = Number(futureEstimate.value);
    output.textContent = value;
    futureEstimate.setAttribute('aria-valuetext', `${value} von 100 Wahlberechtigten`);
    if (!result.hidden) {
      const difference = Math.abs(value - 13);
      feedback.textContent = difference === 0
        ? 'Genau getroffen: Rund 13 von 100 waren unter 30.'
        : `Deine Schätzung: ${value} von 100. Tatsächlich waren es rund 13 – ${difference} ${difference === 1 ? 'Person' : 'Personen'} ${value > 13 ? 'weniger' : 'mehr'}.`;
    }
  };
  futureEstimate.addEventListener('input', describeEstimate);
  document.querySelector('#future-estimate-form').addEventListener('submit', event => {
    event.preventDefault();
    result.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    button.textContent = 'Verteilung aufgedeckt';
    describeEstimate();
  });
  describeEstimate();
}

const futureProcedures = [...document.querySelectorAll('input[name="future-procedure"]')];
futureProcedures.forEach(input => input.addEventListener('change', () => {
  document.querySelectorAll('.future-procedure-panel').forEach(panel => {
    panel.hidden = panel.id !== `future-procedure-${input.value}`;
  });
  document.querySelector('#future-procedure-status').textContent = `Ausgewählt: ${input.closest('label').querySelector('strong').textContent}.`;
}));

const futureVerdicts = {
  success: 'Für diese Bilanz sprechen die neue Aufmerksamkeit, der politische Druck und die veränderten Klimaziele. Welcher dieser Erfolge wiegt für dich am stärksten?',
  partial: 'Dafür spricht die Mischung aus messbarem Einfluss und weiter offenen Forderungen. Was wäre der nächste Schritt, der deine Bilanz deutlich verbessern würde?',
  limited: 'Wer die Bilanz an den eigenen Forderungen misst, sieht deutliche Lücken. Welche konkrete Änderung hätte für dich den Unterschied gemacht?'
};
document.querySelectorAll('input[name="future-fff-verdict"]').forEach(input => input.addEventListener('change', () => {
  const feedback = document.querySelector('#future-verdict-feedback');
  feedback.hidden = false;
  feedback.textContent = futureVerdicts[input.value];
}));
