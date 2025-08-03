// Toggle Light/Dark Mode
const toggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const themeIcon = document.getElementById('theme-icon');

// Carica tema da localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
  themeIcon.className = savedTheme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

toggleBtn.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.className = next === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
});

// Carica Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // Dati di esempio: differenza tra lanci con torre e lanci a mano
  var data = google.visualization.arrayToDataTable([
    ['Mese', 'Torre (%)', 'Mano (%)'],
    ['Gen',  10,      12],
    ['Feb',  14,      16],
    ['Mar',   8,       9],
    ['Apr',  12,      11],
    ['Mag',  15,      14],
    ['Giu',   9,      10]
  ]);

  var options = {
    title: 'Precisione del Lancio: Torre vs Mano',
    curveType: 'function',
    legend: { position: 'bottom' },
    vAxis: { title: 'Scostamento (%)' },
    hAxis: { title: 'Mese' },
    backgroundColor: 'transparent',
    titleTextStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() },
    vAxis: { textStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() },
             titleTextStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() } },
    hAxis: { textStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() },
             titleTextStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() } }
  };

  var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
  chart.draw(data, options);
}
