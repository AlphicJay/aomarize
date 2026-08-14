/**
 * Aomarize Main Renderer Application Logic
 */

let currentRegion = 'all';
let currentCategory = 'all';
let searchQuery = '';
let bookmarkedIds = new Set(JSON.parse(localStorage.getItem('aomarize_bookmarks') || '[]'));
let activeArticleModal = null;
let synth = window.speechSynthesis;
let currentUtterance = null;
let isSpeaking = false;
let scrollInterval = null;
let isUserHovering = false;
let pollingInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initWindowControls();
  initRegionSelector();
  initCategoryFilter();
  initSearch();
  initTicker();
  initStats();
  initReaderModal();
  initAutoScroll();
  initFeedPolling();
  renderFeed();
});

function initAutoScroll() {
  const container = document.querySelector('.feed-content-scroll');
  if (!container) return;

  container.addEventListener('mouseenter', () => isUserHovering = true);
  container.addEventListener('mouseleave', () => isUserHovering = false);
  
  if (scrollInterval) clearInterval(scrollInterval);
  
  scrollInterval = setInterval(() => {
    // Scroll slowly down (stops naturally at bottom)
    if (!isUserHovering && !activeArticleModal && !searchQuery) {
      container.scrollTop += 1;
    }
  }, 40);
}

function initFeedPolling() {
  if (pollingInterval) clearInterval(pollingInterval);
  pollingInterval = setInterval(() => {
    if (!activeArticleModal && !searchQuery) {
      // Re-render feed silently to fetch new cached RSS items
      renderFeed(true);
    }
  }, 10000);
}

// Window Controls Setup (IPC with preload bridge)
function initWindowControls() {
  const minBtn = document.getElementById('winMinBtn');
  const maxBtn = document.getElementById('winMaxBtn');
  const closeBtn = document.getElementById('winCloseBtn');

  if (window.electronAPI) {
    if (minBtn) minBtn.addEventListener('click', () => window.electronAPI.minimize());
    if (maxBtn) maxBtn.addEventListener('click', () => window.electronAPI.maximize());
    if (closeBtn) closeBtn.addEventListener('click', () => window.electronAPI.close());
  } else {
    // Browser preview fallback
    if (minBtn) minBtn.style.display = 'none';
    if (maxBtn) maxBtn.style.display = 'none';
    if (closeBtn) closeBtn.style.display = 'none';
  }
}

// Region Switcher Setup
function initRegionSelector() {
  const regionBtns = document.querySelectorAll('.region-btn');
  regionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      regionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRegion = btn.dataset.region || 'all';
      updateFeedHeader();
      renderFeed();
    });
  });
}

// Category Filter Setup
function initCategoryFilter() {
  const catBtns = document.querySelectorAll('.cat-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category || 'all';
      renderFeed();
    });
  });
}

// Search Input Listener
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderFeed();
    });
  }

  const refreshBtn = document.getElementById('refreshFeedBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.classList.add('spinning');
      setTimeout(() => {
        refreshBtn.classList.remove('spinning');
        renderFeed();
        if (window.electronAPI) {
          window.electronAPI.sendNotification('Feeds Synchronized', 'Latest regional AI news updated successfully.');
        }
      }, 600);
    });
  }

  const bookmarkFilterBtn = document.getElementById('bookmarkFilterBtn');
  if (bookmarkFilterBtn) {
    bookmarkFilterBtn.addEventListener('click', () => {
      bookmarkFilterBtn.classList.toggle('active');
      renderFeed();
    });
  }
}

// Dynamic Breaking News Ticker
function initTicker() {
  const tickerTrack = document.getElementById('tickerTrack');
  if (!tickerTrack) return;

  const allArticles = getAllArticles();
  let tickerHTML = '';
  // Duplicate for seamless infinite marquee loop
  const items = [...allArticles, ...allArticles];

  items.forEach(article => {
    tickerHTML += `
      <div class="ticker-item" data-id="${article.id}">
        <span class="ticker-region-tag">${article.flag} ${article.region.toUpperCase()}</span>
        <span>${escapeHTML(article.title)}</span>
      </div>
    `;
  });
  tickerTrack.innerHTML = tickerHTML;

  tickerTrack.querySelectorAll('.ticker-item').forEach(el => {
    el.addEventListener('click', () => {
      const artId = el.dataset.id;
      const found = allArticles.find(a => a.id === artId);
      if (found) openReaderModal(found);
    });
  });
}

// Sidebar Regional Stats Widget
function initStats() {
  const stats = getRegionalStats();
  const allCountEl = document.getElementById('statAllCount');
  const usCountEl = document.getElementById('statUsCount');
  const ukCountEl = document.getElementById('statUkCount');
  const asiaCountEl = document.getElementById('statAsiaCount');
  const africaCountEl = document.getElementById('statAfricaCount');
  const totalCountEl = document.getElementById('statTotalCount');

  if (allCountEl) allCountEl.textContent = stats.total || '100+';
  if (usCountEl) usCountEl.textContent = stats.us;
  if (ukCountEl) ukCountEl.textContent = stats.uk;
  if (asiaCountEl) asiaCountEl.textContent = stats.asia;
  if (africaCountEl) africaCountEl.textContent = stats.africa;
  if (totalCountEl) totalCountEl.textContent = `${stats.total} Articles`;
}

// Update Header Title based on Selected Region
function updateFeedHeader() {
  const headerTitle = document.getElementById('feedTitle');
  const headerSub = document.getElementById('feedSubtitle');
  if (!headerTitle) return;

  const regionNames = {
    all: 'Global Regional Feed',
    us: 'United States AI Intelligence',
    uk: 'United Kingdom AI Hub',
    asia: 'Asia AI Ecosystem',
    africa: 'Africa AI & Innovation'
  };

  const regionSubs = {
    all: 'Live coverage from Silicon Valley, London, East Asia, and African hubs',
    us: 'Silicon Valley breakthroughs, US AISI policy, and frontier model compute',
    uk: 'London AI Hub, UK Safety Institute, and European frontier labs',
    asia: 'TSMC silicon, East Asian robotics, and ASEAN multimodal LLMs',
    africa: 'African NLP, agricultural AI, and continental governance accords'
  };

  headerTitle.textContent = regionNames[currentRegion] || 'AI News Feed';
  if (headerSub) headerSub.textContent = regionSubs[currentRegion] || '';
}

// Render News Feed Cards
async function renderFeed(silent = false) {
  const grid = document.getElementById('articlesGrid');
  const emptyState = document.getElementById('emptyState');
  const container = document.querySelector('.feed-content-scroll');
  const bookmarkOnly = document.getElementById('bookmarkFilterBtn')?.classList.contains('active');

  let savedScroll = 0;
  if (silent && container) savedScroll = container.scrollTop;

  let articles = await fetchRegionalArticles(currentRegion);

  // Filter by category
  if (currentCategory !== 'all') {
    articles = articles.filter(a => a.category === currentCategory);
  }

  // Filter by search query
  if (searchQuery) {
    articles = articles.filter(a => 
      a.title.toLowerCase().includes(searchQuery) ||
      a.snippet.toLowerCase().includes(searchQuery) ||
      a.source.toLowerCase().includes(searchQuery) ||
      a.category.toLowerCase().includes(searchQuery)
    );
  }

  // Filter by bookmarks
  if (bookmarkOnly) {
    articles = articles.filter(a => bookmarkedIds.has(a.id));
  }

  if (articles.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'flex';
    return;
  }

  grid.style.display = 'grid';
  emptyState.style.display = 'none';

  let html = '';
  articles.forEach(article => {
    const isBookmarked = bookmarkedIds.has(article.id);
    const dateFormatted = new Date(article.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    html += `
      <div class="glass-card" data-id="${article.id}">
        <div class="card-header-tags">
          <span class="region-tag" data-region="${article.region}">
            ${article.flag} ${article.regionName}
          </span>
          <div class="card-meta-right">
            <span class="category-tag">${article.category}</span>
            <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${article.id}" title="Bookmark Article">
              ${isBookmarked ? '★' : '☆'}
            </button>
          </div>
        </div>

        <div class="card-body">
          ${article.imageUrl ? `<img src="${article.imageUrl}" alt="News Image" style="width:100%; height:140px; object-fit:cover; border-radius: 8px; margin-bottom: 8px;"/>` : ''}
          <h3 class="card-title">${escapeHTML(article.title)}</h3>
          <p class="card-snippet">${escapeHTML(article.snippet)}</p>
        </div>

        <div class="card-footer">
          <span class="source-name">📰 ${article.source} • ${dateFormatted}</span>
          <span class="card-read-more">Read Full Story →</span>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;

  // Attach card click handlers
  grid.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.bookmark-btn')) {
        const bBtn = e.target.closest('.bookmark-btn');
        toggleBookmark(bBtn.dataset.id);
        return;
      }
      const artId = card.dataset.id;
      const found = articles.find(a => a.id === artId);
      if (found) openReaderModal(found);
    });
  });

  if (silent && container) {
    container.scrollTop = savedScroll;
  }

  initStats();
}

// Toggle Bookmarking
function toggleBookmark(artId) {
  if (bookmarkedIds.has(artId)) {
    bookmarkedIds.delete(artId);
  } else {
    bookmarkedIds.add(artId);
  }
  localStorage.setItem('aomarize_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
  renderFeed();
}

// Reader Modal Setup & Audio Reader (TTS)
function initReaderModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalCloseBtn');
  const ttsBtn = document.getElementById('ttsPlayBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeReaderModal);
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeReaderModal();
    });
  }

  if (ttsBtn) {
    ttsBtn.addEventListener('click', toggleTTS);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeReaderModal();
  });
}

function openReaderModal(article) {
  activeArticleModal = article;
  stopTTS();

  const backdrop = document.getElementById('modalBackdrop');
  const titleEl = document.getElementById('modalArticleTitle');
  const metaEl = document.getElementById('modalMetaBar');
  const takeawaysEl = document.getElementById('modalTakeawaysList');
  const textEl = document.getElementById('modalFullText');
  const sourceLink = document.getElementById('modalSourceLink');

  if (!backdrop) return;

  titleEl.textContent = article.title;
  metaEl.innerHTML = `
    <span>${article.flag} <strong>${article.regionName}</strong></span> •
    <span>📰 ${article.source}</span> •
    <span>⏱️ ${article.readTime}</span> •
    <span style="color: var(--neon-cyan)">🏷️ ${article.sentiment}</span>
  `;

  // Takeaways
  takeawaysEl.innerHTML = article.keyTakeaways.map(t => `<li>${escapeHTML(t)}</li>`).join('');

  // Full text paragraphs
  const paragraphs = article.fullText.split('\n\n');
  textEl.innerHTML = paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');

  if (sourceLink) {
    sourceLink.onclick = () => {
      if (window.electronAPI) {
        window.electronAPI.openExternal(article.url);
      } else {
        window.open(article.url, '_blank');
      }
    };
  }

  backdrop.classList.add('open');
}

function closeReaderModal() {
  stopTTS();
  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) backdrop.classList.remove('open');
}

// Text-To-Speech (Web Speech API)
function toggleTTS() {
  if (!activeArticleModal) return;

  if (isSpeaking) {
    stopTTS();
    return;
  }

  if (synth.speaking) synth.cancel();

  const textToRead = `${activeArticleModal.title}. ${activeArticleModal.fullText}`;
  currentUtterance = new SpeechSynthesisUtterance(textToRead);
  currentUtterance.rate = 1.0;

  const ttsBtn = document.getElementById('ttsPlayBtn');
  const ttsStatus = document.getElementById('ttsStatus');

  currentUtterance.onstart = () => {
    isSpeaking = true;
    if (ttsBtn) ttsBtn.innerHTML = '⏸️';
    if (ttsStatus) ttsStatus.textContent = 'Reading story aloud...';
  };

  currentUtterance.onend = () => {
    isSpeaking = false;
    if (ttsBtn) ttsBtn.innerHTML = '▶️';
    if (ttsStatus) ttsStatus.textContent = 'Listen to Story';
  };

  currentUtterance.onerror = () => {
    isSpeaking = false;
    if (ttsBtn) ttsBtn.innerHTML = '▶️';
    if (ttsStatus) ttsStatus.textContent = 'Listen to Story';
  };

  synth.speak(currentUtterance);
}

function stopTTS() {
  if (synth && synth.speaking) {
    synth.cancel();
  }
  isSpeaking = false;
  const ttsBtn = document.getElementById('ttsPlayBtn');
  const ttsStatus = document.getElementById('ttsStatus');
  if (ttsBtn) ttsBtn.innerHTML = '▶️';
  if (ttsStatus) ttsStatus.textContent = 'Listen to Story';
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
