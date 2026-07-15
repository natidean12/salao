// Seletores principais
const sliderInner = document.getElementById('sliderInner');
const navLinks = document.querySelectorAll('.nav-links a');
let currentSlide = 0;
const totalSlides = navLinks.length; // Agora calcula dinamicamente as 5 telas!
let isScrolling = false;

// Função para mover para um slide específico
function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  
  // Move o container multiplicando por -100vw
  sliderInner.style.transform = `translateX(-${currentSlide * 100}vw)`;
  
  // Atualiza as classes ativas no menu
  navLinks.forEach((link, idx) => {
    if (idx === currentSlide) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Configura o evento de clique nos links do menu
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSlide = parseInt(link.getAttribute('data-slide'));
    goToSlide(targetSlide);
  });
});

// Navegação Premium com o scroll do Mouse (Roda)
window.addEventListener('wheel', (e) => {
  if (isScrolling) return; // Evita rolagem rápida acumulada
  
  isScrolling = true;
  setTimeout(() => { isScrolling = false; }, 1000); // Bloqueia temporariamente por 1s para o slide encaixar

  if (e.deltaY > 0) {
    // Scroll para baixo -> Próxima tela
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  } else {
    // Scroll para cima -> Tela anterior
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }
});

// Navegação pelas setas do teclado
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
  } else if (e.key === 'ArrowLeft') {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }
});

// --- FUNÇÃO EXCLUSIVA: EFEITO SLIDER ANTES E DEPOIS ---
function compareImages(slider, elementId) {
  const beforeImage = document.getElementById(elementId);
  if (beforeImage) {
    // Ajusta dinamicamente a largura da imagem do "Antes" baseada na posição do slider
    beforeImage.style.width = slider.value + '%';
  }
}

// Função para lidar com o agendamento
function handleBooking(event) {
  event.preventDefault();
  
  // Feedback visual simulando sucesso
  const btn = event.target.querySelector('button');
  const originalText = btn.innerHTML;
  
  btn.innerHTML = "Processando... <i class='fa-solid fa-spinner fa-spin'></i>";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  setTimeout(() => {
    alert("Solicitação enviada! Nossa equipe entrará em contato via WhatsApp para confirmar seu horário.");
    btn.innerHTML = "Agendado com Sucesso! <i class='fa-solid fa-check'></i>";
    btn.style.background = "#25d366";
    btn.style.color = "white";
    
    // Opcional: Resetar formulário após sucesso
    // event.target.reset();
  }, 2000);
}

// --- FUNCIONALIDADE EXCLUSIVA: ACORDEÃO DO FAQ ---
const faqAccordions = document.querySelectorAll('.accordion-faq');

faqAccordions.forEach((acc) => {
  acc.addEventListener('click', function() {
    // Alterna a classe ativa no botão clicado para rotacionar a seta
    this.classList.toggle('active');
    
    const panel = this.nextElementSibling;
    
    // Abre ou fecha suavemente controlando a propriedade max-height
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});
