window.initSorting = function(sortingData) {
  const container = document.getElementById('sorting-container');
  container.innerHTML = '';
  
  if (!document.getElementById('sorting-style')) {
    const style = document.createElement('style');
    style.id = 'sorting-style';
    style.innerHTML = `
      .sort-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--spasi-6);
      }
      .sort-items-pool {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spasi-3);
        padding: var(--spasi-4);
        background: var(--warna-netral-100);
        border-radius: var(--radius-md);
        min-height: 100px;
      }
      .sort-draggable {
        background: white;
        border: 2px solid var(--warna-primer);
        padding: var(--spasi-2) var(--spasi-4);
        border-radius: 20px;
        cursor: grab;
        font-weight: 600;
        user-select: none;
      }
      .sort-draggable:active { cursor: grabbing; }
      .sort-bins {
        display: flex;
        gap: var(--spasi-4);
        flex-wrap: wrap;
      }
      .sort-bin {
        flex: 1;
        min-width: 200px;
        border: 2px dashed #ccc;
        border-radius: var(--radius-md);
        padding: var(--spasi-4);
        min-height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spasi-2);
      }
      .sort-bin h3 { margin: 0 0 var(--spasi-4) 0; text-align: center; }
      .bin-reduce { background: #e8f4fd; border-color: #3b82f6; }
      .bin-reuse { background: #fefce8; border-color: #eab308; }
      .bin-recycle { background: #f0fdf4; border-color: #22c55e; }
      .sort-bin.drag-over { opacity: 0.7; }
    `;
    document.head.appendChild(style);
  }

  // Shuffle items
  const items = [...sortingData].sort(() => 0.5 - Math.random());
  let matchedCount = 0;

  let html = `
    <div class="sort-wrapper fade-in">
      <div class="sort-items-pool" id="sort-pool">
        ${items.map(item => `<div class="sort-draggable" draggable="true" id="sort-${item.id}" data-cat="${item.kategori}">${item.aksi}</div>`).join('')}
      </div>
      <div class="sort-bins">
        <div class="sort-bin bin-reduce" data-cat="reduce">
          <h3>📉 Reduce</h3>
          <p style="font-size:var(--teks-xs); margin:0; text-align:center;">Mengurangi sampah/penggunaan materi baru sedari awal.</p>
        </div>
        <div class="sort-bin bin-reuse" data-cat="reuse">
          <h3>🔄 Reuse</h3>
          <p style="font-size:var(--teks-xs); margin:0; text-align:center;">Menggunakan kembali barang lama untuk fungsi yang sama/berbeda.</p>
        </div>
        <div class="sort-bin bin-recycle" data-cat="recycle">
          <h3>♻️ Recycle</h3>
          <p style="font-size:var(--teks-xs); margin:0; text-align:center;">Mendaur ulang atau menghancurkan barang menjadi material baru.</p>
        </div>
      </div>
      <div id="sort-feedback" style="text-align:center; font-weight:bold; min-height:24px; margin-top:var(--spasi-4);"></div>
    </div>
  `;
  container.innerHTML = html;

  const draggables = container.querySelectorAll('.sort-draggable');
  const bins = container.querySelectorAll('.sort-bin');
  const feedback = document.getElementById('sort-feedback');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
      setTimeout(() => e.target.style.opacity = '0.5', 0);
    });
    draggable.addEventListener('dragend', (e) => {
      e.target.style.opacity = '1';
    });
  });

  bins.forEach(bin => {
    bin.addEventListener('dragover', (e) => {
      e.preventDefault();
      bin.classList.add('drag-over');
    });
    bin.addEventListener('dragleave', () => {
      bin.classList.remove('drag-over');
    });
    bin.addEventListener('drop', (e) => {
      e.preventDefault();
      bin.classList.remove('drag-over');
      
      const draggedId = e.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(draggedId);
      if (!draggedElement) return;

      const targetCat = bin.getAttribute('data-cat');
      const itemCat = draggedElement.getAttribute('data-cat');

      if (targetCat === itemCat) {
        bin.appendChild(draggedElement);
        draggedElement.draggable = false;
        draggedElement.style.border = 'none';
        draggedElement.style.width = '100%';
        draggedElement.style.textAlign = 'center';
        
        feedback.style.color = 'var(--warna-sukses)';
        feedback.innerText = 'Benar!';
        matchedCount++;
        
        if (matchedCount === items.length) {
          feedback.innerText = 'Luar Biasa! Semua aksi berhasil dipilah dengan benar! 🌍';
          window.dkvCore.markComponentDone('1b', 'sorting');
        }
      } else {
        feedback.style.color = 'var(--warna-bahaya)';
        feedback.innerText = 'Oops! Salah kategori penempatan.';
      }
      setTimeout(() => { if (matchedCount < items.length) feedback.innerText = ''; }, 2000);
    });
  });
};
