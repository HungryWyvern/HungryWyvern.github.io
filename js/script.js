// === Navbar shrink on scroll ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('shrink');
  else navbar.classList.remove('shrink');
});

// === Back-to-top button ===
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// === Theme Toggle ===
const toggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const themeIcon = document.getElementById('theme-icon');
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

// === Google Charts Interactive ===
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
let chart, dataTable, view;
function drawChart() {
  dataTable = google.visualization.arrayToDataTable([
    ['Mese', 'Torre (%)', 'Mano (%)'],
    ['Gen',  10,      12],
    ['Feb',  14,      16],
    ['Mar',   8,       9],
    ['Apr',  12,      11],
    ['Mag',  15,      14],
    ['Giu',   9,      10]
  ]);
  const hidden = {1: false, 2: false};
  view = new google.visualization.DataView(dataTable);
  view.setColumns([0,1,2]);
  const options = {
    curveType: 'function', legend: { position: 'bottom', alignment: 'center' },
    series: {0:{lineWidth:3,pointSize:6},1:{lineWidth:3,pointSize:6,lineDashStyle:[4,4]}},
    backgroundColor:'transparent',
    titleTextStyle: { color: getComputedStyle(htmlEl).getPropertyValue('--text-color').trim() },
    hAxis: { textStyle: { color: getComputedStyle(htmlEl).getPropertyValue('--text-color').trim() } },
    vAxis: { textStyle: { color: getComputedStyle(htmlEl).getPropertyValue('--text-color').trim() } }
  };
  chart = new google.visualization.LineChart(document.getElementById('line_chart'));
  google.visualization.events.addListener(chart,'select',()=>{
    const sel=chart.getSelection();
    if(sel.length>0&&sel[0].row===null){
      const col=sel[0].column;
      hidden[col]=!hidden[col];
      const cols=[0]; if(!hidden[1])cols.push(1); if(!hidden[2])cols.push(2);
      view.setColumns(cols);
      chart.draw(view,options);
    }
  });
  chart.draw(view,options);
}

// === Scroll-triggered animations ===
const sections = document.querySelectorAll('.section-animate');
const elems = document.querySelectorAll('.animate-element');
const obsOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add('visible');
  });
}, obsOptions);
sections.forEach(s => observer.observe(s));
elems.forEach(el => observer.observe(el));