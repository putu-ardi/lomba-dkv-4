window.initQuiz1C = function(quizData) {
  const container = document.getElementById('quiz-container');
  const startBtn = document.getElementById('start-quiz-btn');
  
  if (!startBtn) return;

  let currentQuestion = 0;
  let score = 0;

  // Cek apakah sudah pernah lulus
  const state = window.dkvCore.getProgress();
  if (state.modul_1c && state.modul_1c.skor_kuis >= 80) {
    score = state.modul_1c.skor_kuis;
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
      <div class="fade-in" style="margin-top: var(--spasi-4); text-align: left;">
        <h3 style="margin-bottom: var(--spasi-4); text-align: center;">Soal ${currentQuestion + 1} dari ${quizData.length}</h3>
        <p style="font-size: var(--teks-lg); margin-bottom: var(--spasi-6); font-weight: bold;">${q.soal}</p>
        <div id="quiz-options">
    `;

    // 1. Tipe Benar Salah
    if (q.type === 'tf') {
      html += `
        <div style="display: flex; gap: var(--spasi-4); justify-content: center;">
          <button class="btn btn-outline tf-btn" data-val="true">Benar</button>
          <button class="btn btn-outline tf-btn" data-val="false">Salah</button>
        </div>
      `;
    } 
    // 2. Tipe Pilihan Ganda Kompleks
    else if (q.type === 'multi') {
      html += `<p style="color: var(--warna-primer); font-weight:bold; margin-bottom: var(--spasi-4);">Pilih SEMUA jawaban yang benar (Bisa lebih dari 1):</p>`;
      q.opsi.forEach((opt, index) => {
        html += `
          <label style="display: block; background: var(--warna-netral-100); padding: var(--spasi-3); margin-bottom: var(--spasi-2); border-radius: var(--radius-sm); cursor: pointer;">
            <input type="checkbox" class="multi-chk" value="${index}" style="margin-right: var(--spasi-2);"> ${opt}
          </label>
        `;
      });
      html += `<button class="btn btn-primary" id="submit-multi" style="margin-top: var(--spasi-4);">Kunci Jawaban</button>`;
    }
    // 3. Tipe Menjodohkan
    else if (q.type === 'match') {
      html += `<p style="color: var(--warna-primer); font-weight:bold; margin-bottom: var(--spasi-4);">Pilih pasangan yang tepat dari dropdown:</p>`;
      
      // Acak urutan opsi kanan untuk dropdown
      const kananOptions = q.pasangan.map((p, i) => ({ text: p.kanan, id: i })).sort(() => 0.5 - Math.random());
      
      q.pasangan.forEach((p, index) => {
        html += `
          <div style="display: flex; gap: var(--spasi-4); margin-bottom: var(--spasi-4); align-items: center; background: var(--warna-netral-100); padding: var(--spasi-2); border-radius: var(--radius-sm);">
            <div style="flex: 1; font-weight: bold;">${p.kiri}</div>
            <div style="flex: 2;">
              <select class="match-select form-control" data-idx="${index}">
                <option value="">-- Pilih Pasangan --</option>
                ${kananOptions.map(opt => `<option value="${opt.id}">${opt.text}</option>`).join('')}
              </select>
            </div>
          </div>
        `;
      });
      html += `<button class="btn btn-primary" id="submit-match" style="margin-top: var(--spasi-4);">Kunci Jawaban</button>`;
    }

    html += `
        </div>
        <div id="quiz-feedback" style="margin-top: var(--spasi-4); font-weight: bold; min-height: 24px; text-align: center;"></div>
      </div>
    `;

    container.innerHTML = html;
    const feedback = document.getElementById('quiz-feedback');

    // Handle Logic based on Type
    if (q.type === 'tf') {
      const btns = document.querySelectorAll('.tf-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', function() {
          btns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
          const isTrue = this.getAttribute('data-val') === 'true';
          
          if (isTrue === q.jawaban) {
            this.style.backgroundColor = 'var(--warna-sukses)';
            this.style.color = 'white';
            feedback.style.color = 'var(--warna-sukses)';
            feedback.innerText = 'Tepat Sekali! ✓';
            score += 10;
          } else {
            this.style.backgroundColor = 'var(--warna-bahaya)';
            this.style.color = 'white';
            feedback.style.color = 'var(--warna-bahaya)';
            feedback.innerText = 'Kurang Tepat! ✗';
          }
          setTimeout(() => { currentQuestion++; renderQuestion(); }, 2000);
        });
      });
    }
    
    else if (q.type === 'multi') {
      document.getElementById('submit-multi').addEventListener('click', function() {
        this.disabled = true;
        const checkboxes = document.querySelectorAll('.multi-chk');
        let selected = [];
        checkboxes.forEach(chk => {
          if (chk.checked) selected.push(parseInt(chk.value));
          chk.disabled = true;
        });
        
        // Cek array (harus persis sama elemennya)
        const isCorrect = selected.length === q.jawaban.length && selected.every(val => q.jawaban.includes(val));
        
        if (isCorrect) {
          feedback.style.color = 'var(--warna-sukses)';
          feedback.innerText = 'Luar Biasa! Semua pilihanmu benar! ✓';
          score += 10;
        } else {
          feedback.style.color = 'var(--warna-bahaya)';
          feedback.innerText = 'Ada yang salah atau kurang lengkap. ✗';
        }
        setTimeout(() => { currentQuestion++; renderQuestion(); }, 2500);
      });
    }

    else if (q.type === 'match') {
      document.getElementById('submit-match').addEventListener('click', function() {
        this.disabled = true;
        const selects = document.querySelectorAll('.match-select');
        let isCorrect = true;
        
        selects.forEach(sel => {
          sel.disabled = true;
          // Jawaban benar jika value (id original) sama dengan data-idx (posisi aslinya)
          if (sel.value !== sel.getAttribute('data-idx')) {
            isCorrect = false;
            sel.style.borderColor = 'var(--warna-bahaya)';
          } else {
            sel.style.borderColor = 'var(--warna-sukses)';
          }
        });
        
        if (isCorrect) {
          feedback.style.color = 'var(--warna-sukses)';
          feedback.innerText = 'Semua pasangan tepat! ✓';
          score += 10;
        } else {
          feedback.style.color = 'var(--warna-bahaya)';
          feedback.innerText = 'Oops, masih ada yang tertukar! ✗';
        }
        setTimeout(() => { currentQuestion++; renderQuestion(); }, 2500);
      });
    }
  }

  function showResults() {
    window.dkvCore.updateModuleQuiz('1c', score);
    
    let message = score >= 80 ? 'Luar biasa! Pemahamanmu soal estetika sangat baik.' : 'Bagus! Tapi jangan ragu ulas kembali materinya.';
    let extraHtml = '';
    
    if (score === 100) {
      message = 'Selamat, Terjawab Sempurna! Master Desain! 🎇';
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
      for(let i=0; i<40; i++) {
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
        <p style="font-size: var(--teks-lg);">Total Point Modul 1C</p>
        <p style="margin-bottom: var(--spasi-6); font-weight: 600;">${message}</p>
        ${score < 80 ? '<button class="btn btn-primary" id="retry-btn">Ulangi Kuis</button>' : ''}
        <a href="../index.html" class="btn btn-outline" style="margin-left: var(--spasi-2);">Kembali ke Beranda</a>
      </div>
    `;

    window.dkvCore.updateModuleQuiz('1c', score);

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
