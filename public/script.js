
// URL do backend
const API_BASE = 'http://localhost:3000';

// Estado geral da tela
let allNotebooks = [];
let filtroAtivo = 'todos';
let buscaAtual  = '';

// DOM
const cardsGrid      = document.getElementById('cards-grid');
const loadingState   = document.getElementById('loading-state');
const errorState     = document.getElementById('error-state');
const emptyState     = document.getElementById('empty-state');
const errorMessage   = document.getElementById('error-message');
const searchInput    = document.getElementById('search-input');
const filterButtons  = document.querySelectorAll('.filter-btn');
const btnRefresh     = document.getElementById('btn-refresh');
const btnRetry       = document.getElementById('btn-retry');
const lastUpdateText = document.getElementById('last-update-text');
const modalOverlay   = document.getElementById('modal-overlay');
const modalClose     = document.getElementById('modal-close');
const btnModalClose  = document.getElementById('btn-modal-close');

/* API */
// Busca notebooks do backend
async function fetchNotebooks() {
  const res = await fetch(`${API_BASE}/notebooks`, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) throw new Error(`Erro ${res.status}`);

  return res.json();
}

/* =========================
   RENDER DA LISTA
========================= */

// Aplica filtros e renderiza os cards
function renderCards() {
  const termo = buscaAtual.toLowerCase();

  const filtrados = allNotebooks.filter(nb => {
    const statusOk =
      filtroAtivo === 'todos' || nb.status === filtroAtivo;

    const buscaOk =
      !termo ||
      nb.nome?.toLowerCase().includes(termo) ||
      nb.patrimonio?.toLowerCase().includes(termo) ||
      nb.processador?.toLowerCase().includes(termo);

    return statusOk && buscaOk;
  });

  cardsGrid.innerHTML = '';

  if (!filtrados.length) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  filtrados.forEach((nb, idx) => {
    cardsGrid.appendChild(buildCard(nb, idx));
  });
}

// Cria um card de notebook
function buildCard(nb, idx) {
  const { badgeClass, badgeIcon, badgeText } = statusConfig(nb.status);

  const card = document.createElement('div');
  card.className = 'device-card';
  card.style.animationDelay = `${idx * 40}ms`;

  card.innerHTML = `
    <div class="card-top">
      <div class="card-icon-wrap">
        <i class="fa-solid fa-laptop"></i>
      </div>

      <div class="card-info">
        <span class="card-label">NOTEBOOK</span>
        <span class="card-name">${esc(nb.nome) || '—'}</span>
        <span class="card-meta">Patrimônio: ${esc(nb.patrimonio) || '—'}</span>
      </div>

      <div class="card-metric">
        <span>RAM</span>
        <span>${nb.ramTotal ? nb.ramTotal + ' GB' : '—'}</span>
      </div>
    </div>

    <div class="card-status ${badgeClass}">
      <i class="${badgeIcon}"></i> ${badgeText}
    </div>

    <div class="slot-pill">
      ${esc(nb.carrinho?.nome || '—')} · Slot ${nb.numeroSlot ?? '—'}
    </div>

    <button class="btn-action" data-id="${nb._id}">
      Ver Detalhes
    </button>
  `;

  if (nb.status === 'offline') {
    card.querySelector('.btn-action').disabled = true;
  }

  card.querySelector('.btn-action')
    .addEventListener('click', () => openModal(nb));

  return card;
}

/* RESUMO */

function updateSummary(list) {
  document.getElementById('count-total').textContent    = list.length;
  document.getElementById('count-guardado').textContent = list.filter(n => n.status === 'guardado').length;
  document.getElementById('count-retirado').textContent = list.filter(n => n.status === 'retirado').length;
  document.getElementById('count-offline').textContent  = list.filter(n => n.status === 'offline').length;
}

/* MODAL */

function openModal(nb) {
  const { badgeClass, badgeIcon, badgeText } = statusConfig(nb.status);

  document.getElementById('modal-nome').textContent = nb.nome || '—';
  document.getElementById('modal-patrimonio').textContent = nb.patrimonio || '—';

  const badge = document.getElementById('modal-status-badge');
  badge.className = `modal-status-badge ${badgeClass}`;
  badge.innerHTML = `<i class="${badgeIcon}"></i> ${badgeText}`;

  document.getElementById('modal-processador').textContent = nb.processador || '—';
  document.getElementById('modal-ram').textContent = nb.ramTotal ? `${nb.ramTotal} GB` : '—';
  document.getElementById('modal-armazenamento').textContent = nb.armazenamentoTotal ? `${nb.armazenamentoTotal} GB` : '—';
  document.getElementById('modal-sistema').textContent = nb.sistema || '—';
  document.getElementById('modal-slot').textContent = nb.numeroSlot ?? '—';

  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

/* =========================
   CARREGAMENTO
========================= */

async function loadData() {
  showState('loading');

  try {
    const data = await fetchNotebooks();

    allNotebooks = Array.isArray(data)
      ? data
      : (data.notebooks || data.data || []);

    updateSummary(allNotebooks);
    renderCards();

    lastUpdateText.textContent =
      `Atualizado às ${new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;

    showState('cards');
  } catch (err) {
    errorMessage.textContent =
      `Erro ao conectar com a API (${API_BASE})`;

    showState('error');
  }
}

/* 
   HELPERS
*/

// Define visual do status
function statusConfig(status) {
  switch (status) {
    case 'guardado':
      return {
        badgeClass: 'status-online-badge',
        badgeIcon: 'fa-solid fa-circle-check',
        badgeText: 'Guardado'
      };

    case 'retirado':
      return {
        badgeClass: 'status-alert-badge',
        badgeIcon: 'fa-solid fa-triangle-exclamation',
        badgeText: 'Retirado'
      };

    default:
      return {
        badgeClass: 'status-offline-badge',
        badgeIcon: 'fa-solid fa-circle-xmark',
        badgeText: 'Offline'
      };
  }
}

// Controla telas (loading / error / conteúdo)
function showState(state) {
  loadingState.classList.add('hidden');
  errorState.classList.add('hidden');
  emptyState.classList.add('hidden');

  if (state === 'loading') loadingState.classList.remove('hidden');
  if (state === 'error') errorState.classList.remove('hidden');
}

// Evita injeção de HTML
function esc(str) {
  return str ? String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;') : '';
}

/* =========================
   EVENTOS
========================= */

searchInput.addEventListener('input', (e) => {
  buscaAtual = e.target.value.trim();
  renderCards();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtroAtivo = btn.dataset.filter;
    renderCards();
  });
});

btnRefresh.addEventListener('click', loadData);
btnRetry.addEventListener('click', loadData);

modalClose.addEventListener('click', closeModal);
btnModalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});



loadData();