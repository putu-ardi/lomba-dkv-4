window.initPrinciples = function() {
  const container = document.getElementById('principles-container');
  container.innerHTML = '';
  
  if (!document.getElementById('crap-style')) {
    const style = document.createElement('style');
    style.id = 'crap-style';
    style.innerHTML = `
      .crap-wrapper { display: flex; flex-wrap: wrap; gap: var(--spasi-6); }
      .crap-controls { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: var(--spasi-4); }
      .crap-canvas { flex: 2; min-width: 300px; background: #222; border-radius: var(--radius-lg); position: relative; height: 350px; overflow: hidden; transition: 0.5s; }
      
      /* Toggle Switches */
      .crap-switch-group { display: flex; justify-content: space-between; align-items: center; background: white; padding: 10px 15px; border-radius: 8px; box-shadow: var(--bayangan-sm); }
      .switch { position: relative; display: inline-block; width: 50px; height: 24px; }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px; }
      .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
      input:checked + .slider { background-color: var(--warna-primer); }
      input:checked + .slider:before { transform: translateX(26px); }
      
      /* Canvas Elements - Base Messy State */
      .el-title { position: absolute; top: 20%; left: 10%; font-size: 24px; color: #555; transition: 0.8s; font-weight: bold; margin:0; z-index: 10; }
      .el-subtitle { position: absolute; top: 70%; left: 60%; font-size: 16px; color: #666; transition: 0.8s; margin:0; z-index: 10; }
      .el-box1 { position: absolute; top: 50%; left: 50%; width: 50px; height: 50px; background: #444; transition: 0.8s; z-index: 1; }
      .el-box2 { position: absolute; top: 80%; left: 20%; width: 80px; height: 30px; background: #333; transition: 0.8s; z-index: 1; }
      .el-box3 { position: absolute; top: 40%; left: 80%; width: 40px; height: 40px; background: #555; transition: 0.8s; z-index: 1; }
      
      /* Contrast Applied */
      .crap-canvas.has-contrast .el-title { color: #ffffff; font-size: 32px; }
      .crap-canvas.has-contrast .el-subtitle { color: #aaaaaa; }
      .crap-canvas.has-contrast .el-box1 { background: #ef4444; }
      .crap-canvas.has-contrast .el-box2 { background: #3b82f6; }
      .crap-canvas.has-contrast .el-box3 { background: #10b981; }
      
      /* Alignment Applied */
      .crap-canvas.has-alignment .el-title { left: 10%; }
      .crap-canvas.has-alignment .el-subtitle { left: 10%; }
      .crap-canvas.has-alignment .el-box1 { left: 10%; }
      .crap-canvas.has-alignment .el-box2 { left: 10%; }
      .crap-canvas.has-alignment .el-box3 { left: 10%; }
      
      /* Proximity Applied */
      .crap-canvas.has-proximity .el-title { top: 10%; }
      .crap-canvas.has-proximity .el-subtitle { top: 22%; }
      .crap-canvas.has-proximity .el-box1 { top: 45%; }
      .crap-canvas.has-proximity .el-box2 { top: 60%; }
      .crap-canvas.has-proximity .el-box3 { top: 75%; }
      
      /* Balance Applied (Needs alignment & proximity to look good, overrides X pos to make a grid) */
      .crap-canvas.has-balance.has-alignment.has-proximity .el-box1 { top: 45%; left: 10%; width: 100px; height: 100px; }
      .crap-canvas.has-balance.has-alignment.has-proximity .el-box2 { top: 45%; left: calc(10% + 120px); width: 100px; height: 100px; }
      .crap-canvas.has-balance.has-alignment.has-proximity .el-box3 { top: 45%; left: calc(10% + 240px); width: 100px; height: 100px; }
      .crap-canvas.has-balance { background: #111; }
    `;
    document.head.appendChild(style);
  }

  const html = `
    <div class="crap-wrapper fade-in">
      <div class="crap-controls">
        <div class="crap-switch-group">
          <strong>Contrast</strong>
          <label class="switch"><input type="checkbox" id="sw-contrast"><span class="slider"></span></label>
        </div>
        <div class="crap-switch-group">
          <strong>Alignment</strong>
          <label class="switch"><input type="checkbox" id="sw-alignment"><span class="slider"></span></label>
        </div>
        <div class="crap-switch-group">
          <strong>Proximity</strong>
          <label class="switch"><input type="checkbox" id="sw-proximity"><span class="slider"></span></label>
        </div>
        <div class="crap-switch-group">
          <strong>Balance</strong>
          <label class="switch"><input type="checkbox" id="sw-balance"><span class="slider"></span></label>
        </div>
        <p style="font-size: var(--teks-sm); color: var(--warna-netral-600); margin-top: 10px; margin-bottom: 0;">Nyalakan semua sakelar untuk melihat desain yang sempurna!</p>
      </div>
      <div class="crap-canvas" id="crap-canvas">
        <h1 class="el-title">KARYA SENI</h1>
        <h2 class="el-subtitle">Pameran Tahunan DKV</h2>
        <div class="el-box1"></div>
        <div class="el-box2"></div>
        <div class="el-box3"></div>
      </div>
      <!-- Penjelasan Dinamis dipindah ke sini agar melebar penuh di bawah (menghemat tempat) -->
      <div id="crap-explanation" style="flex: 1 1 100%; margin-top: var(--spasi-2); padding: var(--spasi-4); background: #e0f2fe; color: #0369a1; border-radius: var(--radius-sm); font-size: var(--teks-sm); display: none; line-height: 1.6; border-left: 4px solid #0284c7;"></div>
    </div>
  `;
  container.innerHTML = html;

  const canvas = document.getElementById('crap-canvas');
  const expBox = document.getElementById('crap-explanation');
  const switches = ['contrast', 'alignment', 'proximity', 'balance'];
  
  const explanations = {
    contrast: "<strong>Contrast (Kontras):</strong> Memberikan perbedaan mencolok (dari warna atau ukuran) agar elemen terpenting langsung terlihat jelas oleh mata.",
    alignment: "<strong>Alignment (Perataan):</strong> Menyejajarkan setiap elemen ke suatu garis maya (misal: rata kiri) agar desain terlihat terstruktur, rapi, dan saling terhubung.",
    proximity: "<strong>Proximity (Kedekatan):</strong> Mengelompokkan elemen-elemen yang saling berkaitan agar audiens mudah mencerna kelompok informasi tersebut.",
    balance: "<strong>Balance (Keseimbangan):</strong> Membagi bobot visual secara proporsional di seluruh area bidang gambar agar mata merasa nyaman melihatnya."
  };
  
  switches.forEach(sw => {
    document.getElementById(`sw-${sw}`).addEventListener('change', (e) => {
      if (e.target.checked) {
        canvas.classList.add(`has-${sw}`);
      } else {
        canvas.classList.remove(`has-${sw}`);
      }
      
      // Kumpulkan semua penjelasan dari sakelar yang sedang aktif
      let activeExps = [];
      switches.forEach(s => {
        if (document.getElementById(`sw-${s}`).checked) {
          activeExps.push(`<div style="margin-bottom: var(--spasi-2);">${explanations[s]}</div>`);
        }
      });
      
      if (activeExps.length > 0) {
        expBox.style.display = 'block';
        expBox.innerHTML = activeExps.join('');
      } else {
        expBox.style.display = 'none';
        expBox.innerHTML = '';
      }
      
      window.dkvCore.markComponentDone('1c', 'principles');
    });
  });
};
