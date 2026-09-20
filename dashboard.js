(() => {
  const data = window.SF_DASHBOARD;
  if (!data) return;

  document.querySelector('#updatedThrough').textContent = `Updated through ${data.updatedThrough}`;
  document.querySelector('#kpis').innerHTML = data.kpis.map(item => `<article class="kpi"><span>${item.label}</span><strong>${item.value}</strong></article>`).join('');

  const maxFunnel = Math.max(...data.funnel.map(item => item.value));
  document.querySelector('#funnel').innerHTML = data.funnel.map(item => `<div class="funnel-row"><span>${item.label}</span><span class="track"><i class="bar" style="width:${(item.value / maxFunnel) * 100}%"></i></span><strong>${item.value}</strong></div>`).join('');

  document.querySelector('#health').innerHTML = data.health.map(item => `<div><dt>${item.label}</dt><dd>${item.value}</dd></div>`).join('');

  const maxViews = Math.max(...data.daily.map(item => item.views));
  document.querySelector('#daily').innerHTML = data.daily.map(item => `<div class="day"><div class="column users" style="height:${Math.max(12, item.users / maxViews * 100)}%">${item.users}</div><div class="column" style="height:${Math.max(12, item.views / maxViews * 100)}%">${item.views}</div><span class="day-label">${item.label}</span></div>`).join('') + '<p class="legend"><b>Gold: views</b>White: active readers</p>';

  if (data.lookerEmbedUrl) {
    const report = document.querySelector('#liveReport');
    const frame = document.querySelector('#lookerFrame');
    const link = document.querySelector('#liveReportLink');
    frame.src = data.lookerEmbedUrl;
    link.href = data.lookerEmbedUrl.replace('/embed/reporting/', '/reporting/');
    report.hidden = false;
  }
})();
