window.initDesignThinking = function(dtData) {
  const container = document.getElementById('design-thinking-container');
  container.innerHTML = '';
  
  if (!document.getElementById('dt-style')) {
    const style = document.createElement('style');
    style.id = 'dt-style';
    style.innerHTML = `
      .dt-wrapper { display: flex; flex-direction: column; gap: var(--spasi-6); }
      .dt-map { display: flex; justify-content: space-between; position: relative; padding: var(--spasi-4) 0; overflow-x: auto; scroll-snap-type: x mandatory; }
      .dt-line { position: absolute; top: 50px; left: 0; width: 100%; height: 4px; background: var(--warna-netral-100); z-index: 1; }
      .dt-node { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; min-width: 120px; cursor: pointer; scroll-snap-align: center; }
      .dt-icon { width: 60px; height: 60px; border-radius: 50%; background: white; border: 4px solid var(--warna-netral-100); display: flex; align-items: center; justify-content: center; font-size: 24px; transition: 0.3s; margin-bottom: var(--spasi-2); }
      .dt-node:hover .dt-icon { border-color: var(--warna-primer); transform: scale(1.1); }
      .dt-node.active .dt-icon { border-color: var(--warna-primer); background: var(--warna-primer); box-shadow: 0 0 15px rgba(45,45,229,0.5); }
      .dt-title { font-weight: bold; color: var(--warna-netral-600); }
      .dt-node.active .dt-title { color: var(--warna-primer); }
      
      .dt-content-box { background: white; border: 2px solid var(--warna-primer); border-radius: var(--radius-lg); padding: var(--spasi-6); min-height: 150px; display: none; }
      .dt-content-box.active { display: block; animation: fadeIn 0.5s ease-in-out; }
    `;
    document.head.appendChild(style);
  }

  let html = '<div class="dt-wrapper fade-in"><div class="dt-map"><div class="dt-line"></div>';
  
  dtData.forEach((item, index) => {
    html += `
      <div class="dt-node" data-idx="${index}">
        <div class="dt-icon">${item.ikon}</div>
        <div class="dt-title">${item.tahap}</div>
      </div>
    `;
  });
  
  html += '</div>';
  
  html += '<div class="dt-content-box active" id="dt-detail-box">';
  html += `<h3>Pilih Tahapan</h3><p>Klik salah satu tahap Design Thinking di atas untuk melihat detail aktivitasnya.</p>`;
  html += '</div></div>';
  
  container.innerHTML = html;

  const nodes = container.querySelectorAll('.dt-node');
  const detailBox = document.getElementById('dt-detail-box');

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      
      const idx = parseInt(node.getAttribute('data-idx'));
      const data = dtData[idx];
      
      detailBox.innerHTML = `
        <h3 style="color: var(--warna-primer); font-size: 2rem; margin-bottom: var(--spasi-2);">${data.ikon} Tahap ${idx+1}: ${data.tahap}</h3>
        <p style="font-size: var(--teks-lg); line-height: 1.6;">${data.deskripsi}</p>
      `;
      window.dkvCore.markComponentDone('1c', 'design_thinking');
    });
  });
};
