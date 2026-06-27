window.initPetaProfesi = function(profesiData) {
  const container = document.getElementById('mindmap');
  
  // Create a modal for showing details if not exists
  if (!document.getElementById('peta-modal')) {
    const detailModal = document.createElement('div');
    detailModal.className = 'modal-overlay';
    detailModal.id = 'peta-modal';
    detailModal.innerHTML = `
      <div class="modal-content" style="text-align:center;">
        <h2 id="peta-title" style="color: var(--warna-primer);"></h2>
        <div style="font-size: 3rem; margin: var(--spasi-2) 0;" id="peta-icon"></div>
        <p id="peta-desc" style="font-size: var(--teks-lg); margin-bottom: var(--spasi-4);"></p>
        <div style="background: var(--warna-netral-100); padding: var(--spasi-4); border-radius: var(--radius-md); text-align: left;">
          <strong>🛠️ Tools Utama:</strong> <span id="peta-tools"></span><br><br>
          <strong>💰 Rata-rata Gaji:</strong> <span id="peta-salary"></span>
        </div>
        <button class="btn btn-primary" id="peta-close-btn" style="margin-top: var(--spasi-6); width: 100%;">Tutup</button>
      </div>
    `;
    document.body.appendChild(detailModal);

    const closeBtn = document.getElementById('peta-close-btn');
    closeBtn.addEventListener('click', () => {
      detailModal.classList.remove('active');
    });
  }

  const detailModal = document.getElementById('peta-modal');

  // Clear previous nodes just in case
  const oldNodes = container.querySelectorAll('.node-profesi');
  oldNodes.forEach(n => n.remove());

  // Calculate positions for nodes in an ellipse (Mind Map style)
  const isMobile = window.innerWidth < 600;
  const radiusX = isMobile ? 140 : 280; 
  const radiusY = isMobile ? 100 : 160; 
  const totalNodes = profesiData.length;
  
  profesiData.forEach((prof, index) => {
    const angle = (index / totalNodes) * (2 * Math.PI) - (Math.PI / 2);
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;

    const node = document.createElement('div');
    node.className = 'node-profesi fade-in';
    node.style.position = 'absolute';
    node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    node.style.left = '50%';
    node.style.top = '50%';
    node.style.animationDelay = `${index * 0.1}s`;

    node.innerHTML = `<span>${prof.ikon}</span> <span>${prof.nama}</span>`;
    
    node.addEventListener('click', () => {
      document.getElementById('peta-title').innerText = prof.nama;
      document.getElementById('peta-icon').innerText = prof.ikon;
      document.getElementById('peta-desc').innerText = prof.deskripsi;
      document.getElementById('peta-tools').innerText = prof.tools.join(', ');
      document.getElementById('peta-salary').innerText = prof.gaji;
      
      detailModal.classList.add('active');
      window.dkvCore.markComponentDone('1a', 'peta');
    });

    container.appendChild(node);
  });
};
