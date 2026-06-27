document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultScreen = document.getElementById('result-screen');
  const startBtn = document.getElementById('start-btn');

  let currentQuestion = 0;
  let rawScore = 0;
  const SCORE_PER_Q = 100 / 15; // 6.666...
  
  // Cek apakah sudah pernah lulus
  const state = window.dkvCore.getProgress();
  if (state.kuis_akhir && state.kuis_akhir.skor >= 80) {
    rawScore = state.kuis_akhir.skor;
    introScreen.classList.add('hidden');
    showResults();
  }

  // Shuffle questions for Final Quiz
  const shuffledSoal = [...bankSoal].sort(() => 0.5 - Math.random());

  startBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    renderQuestion();
  });

  function renderQuestion() {
    if (currentQuestion >= shuffledSoal.length) {
      showResults();
      return;
    }

    const q = shuffledSoal[currentQuestion];
    
    let html = `
      <div class="fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spasi-2);">
           <h3 style="color: var(--warna-netral-500); text-transform: uppercase; font-size: 0.9rem;">Soal ${currentQuestion + 1} dari ${shuffledSoal.length}</h3>
           <span class="question-type-badge">Modul ${q.modul}</span>
        </div>
        <p style="font-size: 1.3rem; margin-bottom: var(--spasi-6); font-weight: 600;">${q.soal}</p>
        <div id="quiz-options">
    `;

    // 1. Tipe Benar Salah
    if (q.tipe === 'benar_salah') {
      html += `
        <div style="display: flex; gap: var(--spasi-4); justify-content: center;">
          <button class="btn btn-outline tf-btn" data-val="true" style="flex: 1; padding: 16px; font-size: 1.1rem;">Benar</button>
          <button class="btn btn-outline tf-btn" data-val="false" style="flex: 1; padding: 16px; font-size: 1.1rem;">Salah</button>
        </div>
      `;
    } 
    // 2. Tipe Pilihan Ganda Kompleks (Checkbox)
    else if (q.tipe === 'checkbox') {
      html += `<p style="color: var(--warna-primer); font-weight:bold; margin-bottom: var(--spasi-4);">Pilih SEMUA jawaban yang benar (Centang kotak):</p>`;
      q.opsi.forEach((opt, index) => {
        html += `
          <label style="display: flex; align-items: center; background: var(--warna-netral-50); padding: var(--spasi-4); margin-bottom: var(--spasi-3); border-radius: var(--radius-md); cursor: pointer; border: 1px solid var(--warna-netral-200); transition: all 0.2s;">
            <input type="checkbox" class="multi-chk" value="${index}" style="margin-right: var(--spasi-3); transform: scale(1.5);"> 
            <span style="font-size: 1.05rem;">${opt}</span>
          </label>
        `;
      });
      html += `<button class="btn btn-primary" id="submit-multi" style="margin-top: var(--spasi-4); width: 100%;">Kunci Jawaban</button>`;
    }
    // 3. Tipe Menjodohkan
    else if (q.tipe === 'menjodohkan') {
      html += `<p style="color: var(--warna-primer); font-weight:bold; margin-bottom: var(--spasi-4);">Pilih pasangan yang tepat dari kotak pilihan (dropdown):</p>`;
      const kananOptions = q.pasangan.map((p, i) => ({ text: p.kanan, id: i })).sort(() => 0.5 - Math.random());
      
      q.pasangan.forEach((p, index) => {
        html += `
          <div style="display: flex; gap: var(--spasi-4); margin-bottom: var(--spasi-4); align-items: center; background: var(--warna-netral-50); padding: var(--spasi-4); border-radius: var(--radius-md); border: 1px solid var(--warna-netral-200);">
            <div style="flex: 1; font-weight: bold; color: var(--warna-primer);">${p.kiri}</div>
            <div style="flex: 1.5;">
              <select class="match-select form-control" data-idx="${index}" style="width: 100%; border-color: var(--warna-netral-300);">
                <option value="">-- Pilih Pasangan --</option>
                ${kananOptions.map(opt => `<option value="${opt.id}">${opt.text}</option>`).join('')}
              </select>
            </div>
          </div>
        `;
      });
      html += `<button class="btn btn-primary" id="submit-match" style="margin-top: var(--spasi-4); width: 100%;">Kunci Jawaban</button>`;
    }
    // 4. Tipe Pilihan Ganda Biasa
    else if (q.tipe === 'pilihan_ganda') {
      html += `<p style="color: var(--warna-primer); font-weight:bold; margin-bottom: var(--spasi-4);">Pilih satu jawaban yang paling tepat:</p>`;
      q.opsi.forEach((opt, index) => {
        html += `<button class="q-opt-btn pg-btn" data-idx="${index}">${opt}</button>`;
      });
    }
    // 5. Tipe Drag and Drop (Fill in the blank)
    else if (q.tipe === 'drag_drop') {
      // Parse kalimat to create drop zones
      let parsedKalimat = q.kalimat;
      q.jawaban.forEach((_, i) => {
        parsedKalimat = parsedKalimat.replace(`[DROP_${i}]`, `<span class="drop-zone" data-idx="${i}" style="display:inline-flex; align-items:center; justify-content:center; min-width: 180px; min-height: 40px; border: 2px dashed var(--warna-primer); background: var(--warna-netral-100); border-radius: 8px; vertical-align: middle; margin: 0 8px; padding: 4px;"></span>`);
      });

      html += `<div style="font-size: 1.2rem; line-height: 2.8; background: var(--warna-netral-50); padding: var(--spasi-6); border-radius: var(--radius-md); border: 1px solid var(--warna-netral-200); margin-bottom: var(--spasi-6);">${parsedKalimat}</div>`;
      
      html += `<p style="color: var(--warna-primer); font-weight:bold; margin-bottom: var(--spasi-4);">Tarik (Drag) kata di bawah ini ke dalam kotak kosong di atas:</p>`;
      html += `<div style="display: flex; gap: var(--spasi-3); flex-wrap: wrap; margin-bottom: var(--spasi-6); min-height: 60px; padding: var(--spasi-4); background: white; border-radius: var(--radius-md); border: 1px dashed var(--warna-netral-300);" id="drag-container">`;
      
      const draggableOptions = q.pilihan.map((text, idx) => ({text, idx})).sort(() => 0.5 - Math.random());
      
      draggableOptions.forEach(opt => {
        html += `<div class="drag-item" draggable="true" data-val="${opt.idx}" style="background: white; border: 2px solid var(--warna-primer); color: var(--warna-primer); padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: grab; user-select: none; display: inline-block; white-space: nowrap;">${opt.text}</div>`;
      });
      html += `</div>`;
      html += `<button class="btn btn-primary" id="submit-drag" style="width: 100%;">Kunci Jawaban</button>`;
    }

    html += `
        </div>
        <div id="quiz-feedback" style="margin-top: var(--spasi-6); font-weight: bold; min-height: 24px; text-align: center; font-size: 1.2rem;"></div>
      </div>
    `;

    quizScreen.innerHTML = html;
    const feedback = document.getElementById('quiz-feedback');

    // -- LOGIC --

    if (q.tipe === 'benar_salah') {
      const btns = document.querySelectorAll('.tf-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', function() {
          btns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
          const isTrue = this.getAttribute('data-val') === 'true';
          
          if (isTrue === q.jawaban) {
            this.style.backgroundColor = 'var(--warna-sukses)';
            this.style.color = 'white';
            this.style.borderColor = 'var(--warna-sukses)';
            feedback.style.color = 'var(--warna-sukses)';
            feedback.innerText = 'Tepat Sekali! 🎉';
            rawScore += SCORE_PER_Q;
          } else {
            this.style.backgroundColor = 'var(--warna-bahaya)';
            this.style.color = 'white';
            this.style.borderColor = 'var(--warna-bahaya)';
            feedback.style.color = 'var(--warna-bahaya)';
            feedback.innerText = 'Kurang Tepat! 😢';
          }
          setTimeout(() => { currentQuestion++; renderQuestion(); }, 1500);
        });
      });
    }
    
    else if (q.tipe === 'checkbox') {
      document.getElementById('submit-multi').addEventListener('click', function() {
        this.disabled = true;
        const checkboxes = document.querySelectorAll('.multi-chk');
        let selected = [];
        checkboxes.forEach(chk => {
          if (chk.checked) selected.push(parseInt(chk.value));
          chk.disabled = true;
        });
        
        const isCorrect = selected.length === q.jawaban.length && selected.every(val => q.jawaban.includes(val));
        
        if (isCorrect) {
          feedback.style.color = 'var(--warna-sukses)';
          feedback.innerText = 'Luar Biasa! Semua pilihanmu benar! 🎉';
          rawScore += SCORE_PER_Q;
        } else {
          feedback.style.color = 'var(--warna-bahaya)';
          feedback.innerText = 'Ada yang salah atau kurang lengkap. 😢';
        }
        setTimeout(() => { currentQuestion++; renderQuestion(); }, 2000);
      });
    }

    else if (q.tipe === 'menjodohkan') {
      document.getElementById('submit-match').addEventListener('click', function() {
        this.disabled = true;
        const selects = document.querySelectorAll('.match-select');
        let isCorrect = true;
        
        selects.forEach(sel => {
          sel.disabled = true;
          if (sel.value !== sel.getAttribute('data-idx')) {
            isCorrect = false;
            sel.style.borderColor = 'var(--warna-bahaya)';
            sel.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          } else {
            sel.style.borderColor = 'var(--warna-sukses)';
            sel.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
          }
        });
        
        if (isCorrect) {
          feedback.style.color = 'var(--warna-sukses)';
          feedback.innerText = 'Semua pasangan tepat! 🎉';
          rawScore += SCORE_PER_Q;
        } else {
          feedback.style.color = 'var(--warna-bahaya)';
          feedback.innerText = 'Oops, masih ada yang tertukar! 😢';
        }
        setTimeout(() => { currentQuestion++; renderQuestion(); }, 2500);
      });
    }

    else if (q.tipe === 'pilihan_ganda') {
      const btns = document.querySelectorAll('.pg-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', function() {
          btns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
          const selectedIdx = parseInt(this.getAttribute('data-idx'));
          
          if (selectedIdx === q.jawaban) {
            this.style.backgroundColor = 'var(--warna-sukses)';
            this.style.color = 'white';
            this.style.borderColor = 'var(--warna-sukses)';
            feedback.style.color = 'var(--warna-sukses)';
            feedback.innerText = 'Benar! 🎉';
            rawScore += SCORE_PER_Q;
          } else {
            this.style.backgroundColor = 'var(--warna-bahaya)';
            this.style.color = 'white';
            this.style.borderColor = 'var(--warna-bahaya)';
            btns[q.jawaban].style.backgroundColor = 'var(--warna-sukses)';
            btns[q.jawaban].style.color = 'white';
            btns[q.jawaban].style.borderColor = 'var(--warna-sukses)';
            feedback.style.color = 'var(--warna-bahaya)';
            feedback.innerText = 'Salah! Jawaban benar ditandai hijau.';
          }
          setTimeout(() => { currentQuestion++; renderQuestion(); }, 2000);
        });
      });
    }

    else if (q.tipe === 'drag_drop') {
      const dragItems = document.querySelectorAll('.drag-item');
      const dropZones = document.querySelectorAll('.drop-zone');
      let draggedItem = null;

      dragItems.forEach(item => {
        item.addEventListener('dragstart', function() {
          draggedItem = this;
          setTimeout(() => this.style.opacity = '0.5', 0);
        });
        item.addEventListener('dragend', function() {
          setTimeout(() => this.style.opacity = '1', 0);
          draggedItem = null;
        });
      });

      dropZones.forEach(zone => {
        zone.addEventListener('dragover', function(e) {
          e.preventDefault();
          this.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
        });
        zone.addEventListener('dragleave', function() {
          this.style.backgroundColor = 'var(--warna-netral-100)';
        });
        zone.addEventListener('drop', function(e) {
          e.preventDefault();
          this.style.backgroundColor = 'var(--warna-netral-100)';
          if(draggedItem) {
            // Append dragged item to zone
            draggedItem.style.margin = '0';
            // Clear existing if any
            if(this.children.length > 0) {
               document.getElementById('drag-container').appendChild(this.children[0]);
            }
            this.appendChild(draggedItem);
            this.style.border = '2px solid var(--warna-primer)';
          }
        });
      });

      // Allow dragging back to container
      const dragContainer = document.getElementById('drag-container');
      dragContainer.addEventListener('dragover', (e) => e.preventDefault());
      dragContainer.addEventListener('drop', function(e) {
        if(draggedItem) {
          draggedItem.style.margin = '';
          this.appendChild(draggedItem);
        }
      });

      document.getElementById('submit-drag').addEventListener('click', function() {
        this.disabled = true;
        let isCorrect = true;
        // Disable further dragging
        document.querySelectorAll('.drag-item').forEach(i => i.setAttribute('draggable', 'false'));
        
        dropZones.forEach(zone => {
          const expectedVal = q.jawaban[parseInt(zone.getAttribute('data-idx'))].toString();
          const dropped = zone.querySelector('.drag-item');
          
          if (!dropped || dropped.getAttribute('data-val') !== expectedVal) {
            isCorrect = false;
            zone.style.border = '2px solid var(--warna-bahaya)';
          } else {
            zone.style.border = '2px solid var(--warna-sukses)';
          }
        });

        if (isCorrect) {
          feedback.style.color = 'var(--warna-sukses)';
          feedback.innerText = 'Semua kotak terisi dengan tepat! 🎉';
          rawScore += SCORE_PER_Q;
        } else {
          feedback.style.color = 'var(--warna-bahaya)';
          feedback.innerText = 'Ada kotak yang salah isi atau masih kosong. 😢';
        }
        setTimeout(() => { currentQuestion++; renderQuestion(); }, 3000);
      });
    }
  }

  function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    // Pembulatan ke integer
    let finalScore = Math.round(rawScore);
    if(finalScore > 100) finalScore = 100;
    
    const isLulus = finalScore >= 80;
    
    let message = isLulus ? 'Selamat! Anda resmi menguasai keseluruhan kurikulum DKV Grafika Interaktif.' : 'Anda belum mencapai standar minimal kelulusan (80). Silakan ulas materi dan coba lagi.';
    let extraHtml = '';
    
    if (finalScore === 100) {
      message = 'Sempurna! Anda mendapatkan predikat <strong>Master Desain Cum Laude!</strong> 🎓';
      if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.innerHTML = `
          .confetti-piece { position: absolute; width: 10px; height: 30px; background: #ffd300; top: 0; opacity: 0; z-index: 9999;}
          @keyframes makeItRain {
            from {opacity: 0;}
            50% {opacity: 1;}
            to {transform: translateY(600px); opacity: 0;}
          }
        `;
        document.head.appendChild(style);
      }
      let confettiHtml = '<div style="position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; overflow:hidden;">';
      const colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d', '#3b82f6'];
      for(let i=0; i<80; i++) {
        const left = Math.random() * 100;
        const animDelay = Math.random() * 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        confettiHtml += `<div class="confetti-piece" style="left:${left}%; background:${color}; animation: makeItRain 3s infinite ${animDelay}s;"></div>`;
      }
      confettiHtml += '</div>';
      extraHtml = confettiHtml;
    }
    
    const profile = window.dkvCore.getProfile() || { nama: 'Siswa', nisn: '-', smk: '-' };
    
    let btnCertHtml = isLulus ? `<button class="btn btn-outline" onclick="window.print()" style="background: white; border-color: var(--warna-sukses); color: var(--warna-sukses);">Unduh Sertifikat PDF 🖨️</button>` : '';

    resultScreen.innerHTML = `
      ${extraHtml}
      <div class="fade-in no-print" style="text-align: center; position: relative; z-index: 10;">
        <div style="font-size: 5rem; margin-bottom: var(--spasi-2);">${isLulus ? '🏆' : '📚'}</div>
        <h2 style="font-size: 2rem; color: var(--warna-primer); margin-bottom: var(--spasi-2);">Kuis Komprehensif Selesai</h2>
        <h3 style="font-size: 1.5rem; color: var(--warna-netral-700); margin-bottom: var(--spasi-4); font-weight: normal;">Halo, <strong>${profile.nama}</strong>!</h3>
        
        <div style="background: ${isLulus ? 'var(--warna-sukses)' : 'var(--warna-bahaya)'}; color: white; padding: var(--spasi-6); border-radius: var(--radius-lg); margin-bottom: var(--spasi-6); display: inline-block;">
          <div style="font-size: 1rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Skor Akhir Anda</div>
          <div style="font-size: 4rem; font-weight: 900; line-height: 1;">${finalScore}</div>
        </div>
        
        <p style="font-size: 1.2rem; margin-bottom: var(--spasi-8); max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">${message}</p>
        
        <div style="display: flex; gap: var(--spasi-4); justify-content: center; flex-wrap: wrap;">
          ${!isLulus ? '<button class="btn btn-outline" id="retry-btn">Coba Lagi</button>' : ''}
          <a href="../index.html" class="btn btn-primary">Kembali ke Beranda</a>
          ${btnCertHtml}
        </div>
      </div>
    `;

    if (isLulus) {
      // Append Certificate specifically to body to avoid being hidden by parents in print
      let certEl = document.getElementById('print-cert');
      if(!certEl) {
         certEl = document.createElement('div');
         certEl.id = 'print-cert';
         certEl.className = 'print-only cert-container';
         certEl.innerHTML = `
           <div class="cert-content">
              <h1 class="cert-title">SERTIFIKAT KELULUSAN</h1>
              <p class="cert-subtitle">Diberikan dengan penuh rasa bangga kepada:</p>
              <h2 class="cert-name">${profile.nama}</h2>
              <p class="cert-school">NISN: ${profile.nisn} &nbsp;|&nbsp; ${profile.smk}</p>
              
              <p class="cert-desc">Atas dedikasi dan pencapaiannya menyelesaikan seluruh Modul Pembelajaran Interaktif <strong>Dasar DKV & Grafika</strong> dengan predikat yang memuaskan.</p>
              
              <div class="cert-score-box">
                 <div style="font-size: 16px; margin-bottom: 10px;">Nilai Akhir Ujian Komprehensif</div>
                 <div class="cert-score-num">${finalScore}</div>
              </div>
              
              <div class="cert-footer">
                 <div class="signature-box">
                    <div style="font-style: italic; margin-bottom: 40px; color: #64748b; font-size: 18px;">Disahkan Oleh,</div>
                    <div style="font-weight: bold; border-top: 2px solid #1e3a8a; padding-top: 10px; font-size: 18px;">Guru Pengajar</div>
                 </div>
              </div>
           </div>
         `;
         document.body.appendChild(certEl);
      }
    }

    // Save final state
    const state = window.dkvCore.getProgress();
    state.kuis_akhir.sudah_dikerjakan = true;
    if (state.kuis_akhir.skor === null || finalScore > state.kuis_akhir.skor) {
      state.kuis_akhir.skor = finalScore;
    }
    
    // Inject custom print styles dynamically
    if(isLulus && !document.getElementById('print-style')) {
       const pStyle = document.createElement('style');
       pStyle.id = 'print-style';
       pStyle.innerHTML = `
         .print-only { display: none; }
         @media print {
            @page { size: A4 landscape; margin: 0; }
            html, body { 
               margin: 0 !important; padding: 0 !important; 
               width: 100% !important; height: 100% !important; 
               background: white !important; 
               overflow: hidden !important; 
            }
            body > *:not(#print-cert) { display: none !important; }
            
            .print-only { 
               display: flex !important; 
               position: relative !important; 
               width: 99vw !important; height: 99vh !important; 
               background: white !important; 
               z-index: 999999; 
               margin: 0 auto !important; padding: 0 !important;
               overflow: hidden !important;
               page-break-after: avoid !important;
               page-break-before: avoid !important;
               page-break-inside: avoid !important;
            }
            
            /* Certificate Design with fixed MM/PX sizing for strict A4 fit */
            .cert-container {
               background-image: linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%);
               align-items: center; justify-content: center;
               border: 15mm solid #1e3a8a; box-sizing: border-box;
            }
            .cert-container::after {
               content: ''; position: absolute; top:8mm; left:8mm; right:8mm; bottom:8mm;
               border: 3px solid #3b82f6; pointer-events: none;
            }
            .cert-content { text-align: center; max-width: 220mm; padding: 0; margin: 0 auto; font-family: 'Plus Jakarta Sans', sans-serif;}
            .cert-title { font-size: 32px; color: #1e3a8a; margin-bottom: 5px; font-weight: 800; letter-spacing: 4px; margin-top: 0;}
            .cert-subtitle { font-size: 14px; color: #64748b; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; }
            .cert-name { font-size: 40px; color: #0f172a; margin-bottom: 5px; font-weight: bold; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; display: inline-block; min-width: 150mm;}
            .cert-school { font-size: 14px; color: #475569; margin-bottom: 15px; }
            .cert-desc { font-size: 16px; color: #334155; line-height: 1.4; margin-bottom: 15px; padding: 0 20mm;}
            .cert-score-box { background: rgba(255,255,255,0.7); border: 2px dashed #3b82f6; padding: 10px 20px; border-radius: 12px; display: inline-block; margin-bottom: 15px;}
            .cert-score-num { font-size: 44px; font-weight: 800; color: #1e3a8a; line-height: 1; margin: 0; padding: 0;}
            .cert-footer { display: flex; justify-content: flex-end; width: 100%; padding-right: 20mm; margin-top: 0;}
            .signature-box { text-align: center; width: 60mm; }
         }
       `;
       document.head.appendChild(pStyle);
    }
    
    window.dkvCore.updateModuleQuiz('akhir', finalScore); 
    window.dkvCore.saveProgress(state);

    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }
});
