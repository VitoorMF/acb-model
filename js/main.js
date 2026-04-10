/* =============================================
   ACBrasil — main.js
   ============================================= */

// ---------- Navbar scroll shadow ----------
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ---------- Hamburger menu ----------
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  // Fechar ao clicar em link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// ---------- Active nav link por página ----------
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ---------- Filtro de artigos ----------
const catBtns   = document.querySelectorAll('.cat-btn');
const articles  = document.querySelectorAll('.article-card');

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    articles.forEach(card => {
      const show = cat === 'todos' || card.dataset.cat === cat;
      card.style.display = show ? 'flex' : 'none';
      if (show) {
        card.style.animation = 'fadeIn .3s ease';
      }
    });
  });
});

// ---------- Busca de artigos ----------
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    articles.forEach(card => {
      const title   = card.querySelector('.article-card__title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.article-card__excerpt')?.textContent.toLowerCase() || '';
      card.style.display = (title.includes(q) || excerpt.includes(q)) ? 'flex' : 'none';
    });
    // Resetar filtros
    if (q) {
      catBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('[data-cat="todos"]')?.classList.add('active');
    }
  });
}

// ---------- Formulário de contato ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Simula envio
    setTimeout(() => {
      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
      contactForm.reset();
      document.getElementById('formSuccess').style.display = 'block';
      setTimeout(() => {
        document.getElementById('formSuccess').style.display = 'none';
      }, 5000);
    }, 1200);
  });
}

// ---------- Formulário de associação ----------
const assocForm = document.getElementById('associacaoForm');
if (assocForm) {
  assocForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!assocForm.checkValidity()) {
      assocForm.reportValidity();
      return;
    }
    const btn = assocForm.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Enviar solicitação de associação';
      btn.disabled = false;
      assocForm.reset();
      document.getElementById('assocSuccess').style.display = 'block';
      setTimeout(() => {
        document.getElementById('assocSuccess').style.display = 'none';
      }, 6000);
    }, 1400);
  });
}

// ---------- Smooth scroll para âncoras ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = 80; // altura da navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---------- Animação de entrada (Intersection Observer) ----------
const observerOptions = { threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.highlight-card, .article-card, .mvv-card, .about-grid, .cta-banner'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ---------- Paginação (placeholder) ----------
document.querySelectorAll('.page-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
