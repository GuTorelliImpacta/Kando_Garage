import { applyStatus } from './status-horario';
import { initReveal } from './reveal';
import { initCounter } from './counter';
import { initHeader, initActionBar, initEmail, initMap, initYear, initReviewsNav, initLightbox, initTracking } from './ui';

applyStatus();
setInterval(applyStatus, 60_000);
initHeader();
initActionBar();
initEmail();
initMap();
initYear();
initReviewsNav();
initLightbox();
initTracking();
initReveal();
initCounter();
