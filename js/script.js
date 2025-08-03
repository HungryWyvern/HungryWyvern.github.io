// === Tema Light/Dark Toggle ===
const toggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const themeIcon = document.getElementById('theme-icon');
// Inizializza tema salvato
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

// === Google Charts Interattivo ===
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
let chart, dataTable, view;
function drawChart() {
  dataTable = google.visualization.arrayToDataTable([
    ['Mese', 'Torre (%)', 'Mano (%)'],
    ['Gen', 10, 12], ['Feb', 14, 16], ['Mar', 8, 9],
    ['Apr', 12, 11], ['Mag', 15, 14], ['Giu', 9, 10]
  ]);
  const hidden = {1: false, 2: false};
  view = new google.visualization.DataView(dataTable);
  view.setColumns([0,1,2]);
  const options = {
    // title: 'Precisione del Lancio: Torre vs Mano',
    curveType: 'function', legend: { position: 'bottom' },
    series: {0:{lineWidth:3,pointSize:6},1:{lineWidth:3,pointSize:6,lineDashStyle:[4,4]}},
    backgroundColor: 'transparent',
    hAxis: { title: 'N° lancio' }, vAxis: { title: 'Scostamento' }
  };
  chart = new google.visualization.LineChart(document.getElementById('line_chart'));
  google.visualization.events.addListener(chart, 'select', () => {
    const sel = chart.getSelection();
    if (sel.length && sel[0].row === null) {
      const col = sel[0].column;
      hidden[col] = !hidden[col];
      const cols = [0]; if (!hidden[1]) cols.push(1); if (!hidden[2]) cols.push(2);
      view.setColumns(cols);
      chart.draw(view, options);
    }
  });
  chart.draw(view, options);
}