(() => {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.sfTrack = (eventName, parameters = {}) => {
    window.gtag('event', eventName, parameters);
  };

  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    const link = target?.closest('a');
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    const details = {
      link_url: url.href,
      link_text: (link.textContent || '').trim().slice(0, 100)
    };

    if (/amazon\.com$/i.test(url.hostname) || /\.amazon\.com$/i.test(url.hostname)) {
      window.sfTrack('amazon_click', details);
    } else if (/\/read\.html$/i.test(url.pathname)) {
      window.sfTrack('preview_click', details);
    } else if (/\/characters\.html$/i.test(url.pathname)) {
      window.sfTrack('profiles_click', details);
    }

    if (link.hasAttribute('download')) {
      window.sfTrack('roster_download', {
        file_name: url.pathname.split('/').pop() || '',
        link_url: url.href
      });
    }
  });
})();
