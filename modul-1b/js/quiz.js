window.initQuiz1B = function(quizData) {
  const container = document.getElementById('quiz-container');
  const startBtn = document.getElementById('start-quiz-btn');
  
  if (!startBtn) return;

  let currentQuestion = 0;
  let score = 0;

  // Cek apakah sudah pernah lulus
  const state = window.dkvCore.getProgress();
  if (state.modul_1b && state.modul_1b.skor_kuis >= 80) {
    score = state.modul_1b.skor_kuis;
    startBtn.style.display = 'none';
    showResults();
    return;
  }

  const newStartBtn = startBtn.cloneNode(true);
  startBtn.parentNode.replaceChild(newStartBtn, startBtn);

  newStartBtn.addEventListener('click', () => {
    renderQuestion();
  });

  function renderQuestion() {
    if (currentQuestion >= quizData.length) {
      showResults();
      return;
    }

    const q = quizData[currentQuestion];
    
    let html = `
      <div class="fade-in" style="margin-top: var(--spasi-4);">
        <h3 style="margin-bottom: var(--spasi-4);">Soal ${currentQuestion + 1} dari ${quizData.length}</h3>
        <p style="font-size: var(--teks-lg); margin-bottom: var(--spasi-6);">${q.soal}</p>
        <div style="display: flex; flex-direction: column; gap: var(--spasi-2);" id="quiz-options">
    `;

    q.opsi.forEach((opt, index) => {
      html += `<button class="btn btn-outline" style="text-align: left; border-color: #ccc; color: var(--warna-netral-800);" data-idx="${index}">${opt}</button>`;
    });

    html += `
        </div>
        <div id="quiz-feedback" style="margin-top: var(--spasi-4); font-weight: bold; min-height: 24px;"></div>
      </div>
    `;

    container.innerHTML = html;

    const options = document.querySelectorAll('#quiz-options button');
    const feedback = document.getElementById('quiz-feedback');

    options.forEach(btn => {
      btn.addEventListener('click', function() {
        options.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
        
        const selectedIdx = parseInt(this.getAttribute('data-idx'));
        if (selectedIdx === q.jawaban) {
          this.style.backgroundColor = 'var(--warna-sukses)';
          this.style.color = 'white';
          feedback.style.color = 'var(--warna-sukses)';
          feedback.innerText = 'Benar! ✓';
          score += 20; 
        } else {
          this.style.backgroundColor = 'var(--warna-bahaya)';
          this.style.color = 'white';
          options[q.jawaban].style.backgroundColor = 'var(--warna-sukses)';
          options[q.jawaban].style.color = 'white';
          
          feedback.style.color = 'var(--warna-bahaya)';
          feedback.innerText = 'Salah! ✗ Jawaban yang benar ditandai warna hijau.';
        }

        setTimeout(() => {
          currentQuestion++;
          renderQuestion();
        }, 1500); 
      });
    });
  }

  function showResults() {
    window.dkvCore.updateModuleQuiz('1b', score);
    
    let message = score >= 80 ? 'Luar biasa! Pemahamanmu sangat baik.' : 'Bagus! Tapi kamu bisa lebih baik lagi. Coba ulas kembali materinya.';
    let extraHtml = '';
    
    if (score === 100) {
      message = 'Selamat, Terjawab Sempurna! 🎇';
      if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.innerHTML = `
          .confetti-piece { position: absolute; width: 10px; height: 30px; background: #ffd300; top: 0; opacity: 0; }
          @keyframes makeItRain {
            from {opacity: 0;}
            50% {opacity: 1;}
            to {transform: translateY(350px); opacity: 0;}
          }
        `;
        document.head.appendChild(style);
      }
      
      let confettiHtml = '<div style="position:relative; width:100%; height:0; pointer-events:none;">';
      const colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
      for(let i=0; i<30; i++) {
        const left = Math.random() * 100;
        const animDelay = Math.random() * 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        confettiHtml += `<div class="confetti-piece" style="left:${left}%; background:${color}; animation: makeItRain 2.5s infinite ${animDelay}s;"></div>`;
      }
      confettiHtml += '</div>';
      extraHtml = confettiHtml;
    }
    
    container.innerHTML = `
      ${extraHtml}
      <div class="fade-in" style="text-align: center; padding: var(--spasi-6); position: relative; z-index: 10;">
        <h2 style="font-size: 3rem; color: var(--warna-primer); margin-bottom: 0;">${score}</h2>
        <p style="font-size: var(--teks-lg);">Total Point Modul 1B</p>
        <p style="margin-bottom: var(--spasi-6); font-weight: 600;">${message}</p>
        ${score < 80 ? '<button class="btn btn-primary" id="retry-btn">Ulangi Kuis</button>' : ''}
        <a href="../index.html" class="btn btn-outline" style="margin-left: var(--spasi-2);">Kembali ke Beranda</a>
      </div>
    `;

    window.dkvCore.updateModuleQuiz('1b', score);

    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        renderQuestion();
      });
    }
  }
};
