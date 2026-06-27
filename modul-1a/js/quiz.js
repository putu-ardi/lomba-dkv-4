window.initQuiz = function(quizData) {
  const container = document.getElementById('quiz-container');
  const startBtn = document.getElementById('start-quiz-btn');
  
  if (!startBtn) return;

  let currentQuestion = 0;
  let score = 0;

  startBtn.addEventListener('click', () => {
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
        <h3 style="margin-bottom: var(--spasi-4);">Soal \${currentQuestion + 1} dari \${quizData.length}</h3>
        <p style="font-size: var(--teks-lg); margin-bottom: var(--spasi-6);">\${q.soal}</p>
        <div style="display: flex; flex-direction: column; gap: var(--spasi-2);" id="quiz-options">
    `;

    q.opsi.forEach((opt, index) => {
      html += `<button class="btn btn-outline" style="text-align: left; border-color: #ccc; color: var(--warna-netral-800);" data-idx="\${index}">\${opt}</button>`;
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
        // Disable all buttons
        options.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
        
        const selectedIdx = parseInt(this.getAttribute('data-idx'));
        if (selectedIdx === q.jawaban) {
          this.style.backgroundColor = 'var(--warna-sukses)';
          this.style.color = 'white';
          feedback.style.color = 'var(--warna-sukses)';
          feedback.innerText = 'Benar! ✓';
          score += 20; // 5 questions = 100 points
        } else {
          this.style.backgroundColor = 'var(--warna-bahaya)';
          this.style.color = 'white';
          // Highlight correct answer
          options[q.jawaban].style.backgroundColor = 'var(--warna-sukses)';
          options[q.jawaban].style.color = 'white';
          
          feedback.style.color = 'var(--warna-bahaya)';
          feedback.innerText = 'Salah! ✗ Jawaban yang benar ditandai warna hijau.';
        }

        setTimeout(() => {
          currentQuestion++;
          renderQuestion();
        }, 1500); // PRD feedback < 300ms, then delay for next question
      });
    });
  }

  function showResults() {
    // Save to LocalStorage
    window.dkvCore.updateModuleQuiz('1a', score);
    
    let message = score >= 80 ? 'Luar biasa! Pemahamanmu sangat baik.' : 'Bagus! Tapi kamu bisa lebih baik lagi. Coba ulas kembali materinya.';
    
    container.innerHTML = `
      <div class="fade-in" style="text-align: center; padding: var(--spasi-6);">
        <h2 style="font-size: 3rem; color: var(--warna-primer); margin-bottom: 0;">\${score}</h2>
        <p style="font-size: var(--teks-lg);">Skor Kamu</p>
        <p style="margin-bottom: var(--spasi-6);">\${message}</p>
        <button class="btn btn-primary" id="retry-btn">Ulangi Kuis</button>
        <a href="../index.html" class="btn btn-outline" style="margin-left: var(--spasi-2);">Kembali ke Beranda</a>
      </div>
    `;

    document.getElementById('retry-btn').addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      renderQuestion();
    });
  }
};
