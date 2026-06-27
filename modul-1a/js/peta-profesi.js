window.initPetaProfesi = function(profesiData) {
  const container = document.getElementById('mindmap');
  
  // Create a modal for showing details
  const detailModal = document.createElement('div');
  detailModal.className = 'modal-overlay';
  detailModal.id = 'peta-modal';
  detailModal.innerHTML = `
    <div class="modal-content" style="text-align:center;">
      <h2 id="peta-title" style="color: var(--warna-primer);"></h2>
      <div style="font-size: 3rem; margin: var(--spasi-2) 0;" id="peta-icon"></div>
      <p id="peta-desc" style="font-size: var(--teks-lg); margin-bottom: var(--spasi-4);"></p>
      <div style="background: var(--warna-netral-100); padding: var(--spasi-4); border-radius: var(--radius-md); text-align: left;">
        <strong>ðŸ› ï¸ Tools Utama:</strong> <span id="peta-tools"></span><br><br>
        <strong>ðŸ’° Rata-rata Gaji:</strong> <span id="peta-salary"></span>
      </div>
      <button class="btn btn-primary" id="peta-close-btn" style="margin-top: var(--spasi-6); width: 100%;">Tutup</button>
    </div>
  `;
  document.body.appendChild(detailModal);

  const closeBtn = document.getElementById('peta-close-btn');
  closeBtn.addEventListener('click', () => {
    detailModal.classList.remove('active');
  });

  // Calculate positions for nodes in a circle (Mind Map style)
  const radius = window.innerWidth < 600 ? 120 : 180; 
  const totalNodes = profesiData.length;
  
  profesiData.forEach((prof, index) => {
    const angle = (index / totalNodes) * (2 * Math.PI);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const node = document.createElement('div');
    node.className = 'node-profesi fade-in';
    // Style as absolute if we want a true circle, but our container is flex.
    // To make a true mind map, we set container to relative and nodes to absolute.
    node.style.position = 'absolute';
    node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    // Add 50% left/top to center them relative to the container
    node.style.left = '50%';
    node.style.top = '50%';
    node.style.animationDelay = \`${index * 0.1}s\`;

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
