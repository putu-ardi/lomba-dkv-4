window.initVisualPlay = function() {
  const container = document.getElementById('visual-play-container');
  container.innerHTML = '';
  
  if (!document.getElementById('vp-style')) {
    const style = document.createElement('style');
    style.id = 'vp-style';
    style.innerHTML = `
      .vp-wrapper { display: flex; flex-wrap: wrap; gap: var(--spasi-6); }
      .vp-controls { flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: var(--spasi-4); }
      .vp-canvas { flex: 1; min-width: 250px; background: #f0f0f0; border-radius: var(--radius-lg); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; padding: var(--spasi-4); }
      
      .vp-shape {
        width: 150px; height: 150px;
        background: #3b82f6;
        display: flex; align-items: center; justify-content: center;
        color: white; font-size: 2rem; font-weight: bold;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
      }
      /* Shape Classes */
      .vp-circle { border-radius: 50%; }
      .vp-square { border-radius: 10px; }
      .vp-triangle { 
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        border-radius: 0;
        align-items: flex-end; /* Push content lower */
        padding-bottom: 25px; /* Visual center of triangle */
      }
      
      /* Control Groups */
      .vp-group-title { font-weight: bold; margin-bottom: var(--spasi-2); font-size: var(--teks-sm); text-transform: uppercase; letter-spacing: 1px; color: var(--warna-netral-600); }
      .vp-btn-group { display: flex; gap: var(--spasi-2); flex-wrap: wrap; }
      .vp-btn { padding: 8px 16px; border: 2px solid #ddd; background: white; border-radius: 20px; cursor: pointer; transition: 0.2s; font-weight: 600; }
      .vp-btn.active { border-color: var(--warna-primer); background: var(--warna-primer); color: white; }
    `;
    document.head.appendChild(style);
  }

  const html = `
    <div class="vp-wrapper fade-in">
      <div class="vp-controls">
        <div>
          <div class="vp-group-title">Bentuk (Shape)</div>
          <div class="vp-btn-group" id="vp-shapes">
            <button class="vp-btn active" data-val="circle">Lingkaran</button>
            <button class="vp-btn" data-val="square">Kotak</button>
            <button class="vp-btn" data-val="triangle">Segitiga</button>
          </div>
        </div>
        <div>
          <div class="vp-group-title">Warna (Color)</div>
          <div class="vp-btn-group" id="vp-colors">
            <button class="vp-btn active" data-val="#3b82f6">Biru</button>
            <button class="vp-btn" data-val="#ef4444">Merah</button>
            <button class="vp-btn" data-val="#10b981">Hijau</button>
            <button class="vp-btn" data-val="#f59e0b">Kuning</button>
          </div>
        </div>
        <div>
          <div class="vp-group-title">Tipografi (Font)</div>
          <div class="vp-btn-group" id="vp-fonts">
            <button class="vp-btn active" data-val="'Inter', sans-serif">Sans-Serif (Modern)</button>
            <button class="vp-btn" data-val="Georgia, serif">Serif (Klasik)</button>
            <button class="vp-btn" data-val="'Comic Sans MS', cursive">Handwriting (Santai)</button>
          </div>
        </div>
      </div>
      <div class="vp-canvas">
        <div class="vp-shape vp-circle" id="vp-target"><span>DKV</span></div>
        <div id="vp-emotion" style="margin-top: 30px; font-weight: bold; font-size: 1.2rem; color: #555; text-align:center;">Ramah, Modern, Terpercaya</div>
      </div>
    </div>
  `;
  container.innerHTML = html;

  // Logic
  let currentShape = 'circle';
  let currentColor = '#3b82f6'; // Blue
  let currentFont = "'Inter', sans-serif";

  const target = document.getElementById('vp-target');
  const emotionText = document.getElementById('vp-emotion');

  function updateCanvas() {
    // Apply Font
    target.style.fontFamily = currentFont;
    
    // Apply Shape & Color
    target.className = `vp-shape vp-${currentShape}`;
    target.style.background = currentColor;
    target.style.color = 'white'; // Teks selalu putih di dalam warna

    // Determine Emotion Logic (Simplified AI-like response)
    let em_shape = currentShape === 'circle' ? 'Ramah & Dinamis' : currentShape === 'square' ? 'Kaku & Stabil' : 'Agresif & Tajam';
    let em_color = currentColor === '#3b82f6' ? 'Terpercaya (Biru)' : currentColor === '#ef4444' ? 'Berani/Bahaya (Merah)' : currentColor === '#10b981' ? 'Natural/Tenang (Hijau)' : 'Ceria/Enerjik (Kuning)';
    let em_font = currentFont.includes('Inter') ? 'Modern' : currentFont.includes('Georgia') ? 'Klasik/Elegan' : 'Santai/Kekanak-kanakan';

    emotionText.innerHTML = `<span style="color:${currentColor}">${em_color}</span> + ${em_shape} + ${em_font}`;
    
    window.dkvCore.markComponentDone('1c', 'visual_play');
  }

  function setupBtns(groupId, callback) {
    const btns = document.querySelectorAll(`#${groupId} .vp-btn`);
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        callback(btn.getAttribute('data-val'));
        updateCanvas();
      });
    });
  }

  setupBtns('vp-shapes', (val) => currentShape = val);
  setupBtns('vp-colors', (val) => currentColor = val);
  setupBtns('vp-fonts', (val) => currentFont = val);
};
