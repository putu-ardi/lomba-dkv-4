window.initDragMatch = function(profesiData) {
  const container = document.getElementById('drag-drop-container');
  
  // Style injection
  if (!document.getElementById('drag-match-style')) {
    const style = document.createElement('style');
    style.id = 'drag-match-style';
    style.innerHTML = `
      .drag-match-wrapper {
        display: flex;
        gap: var(--spasi-6);
        flex-wrap: wrap;
      }
      .drag-column {
        flex: 1;
        min-width: 250px;
      }
      .draggable-item {
        background: var(--gradien-primer);
        color: white;
        padding: var(--spasi-3);
        margin-bottom: var(--spasi-3);
        border-radius: var(--radius-md);
        cursor: grab;
        text-align: center;
        font-weight: 600;
        user-select: none;
      }
      .draggable-item:active { cursor: grabbing; }
      .drop-zone {
        background: var(--warna-netral-100);
        border: 2px dashed #ccc;
        padding: var(--spasi-4);
        margin-bottom: var(--spasi-3);
        border-radius: var(--radius-md);
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        text-align: center;
        font-size: var(--teks-sm);
      }
      .drop-zone.drag-over {
        border-color: var(--warna-primer);
        background: #eef2ff;
      }
      .drop-zone.matched {
        border: 2px solid var(--warna-sukses);
        background: #e6f6f0;
      }
      .feedback-msg {
        text-align: center;
        font-weight: 700;
        margin-top: var(--spasi-4);
        min-height: 24px;
      }
    `;
    document.head.appendChild(style);
  }

  // Shuffle and pick 4 items for the game
  const shuffled = [...profesiData].sort(() => 0.5 - Math.random());
  const gameData = shuffled.slice(0, 4);
  const tasks = [...gameData].sort(() => 0.5 - Math.random()); // separate shuffle for targets

  let matchedCount = 0;

  let html = '<div class="drag-match-wrapper">';
  
  // Draggables Column
  html += '<div class="drag-column" id="draggables-col"><h4>Profesi</h4>';
  gameData.forEach(item => {
    html += `<div class="draggable-item" draggable="true" id="drag-\${item.id}" data-id="\${item.id}">\${item.ikon} \${item.nama}</div>`;
  });
  html += '</div>';

  // Dropzones Column
  html += '<div class="drag-column" id="dropzones-col"><h4>Tugas Utama</h4>';
  tasks.forEach(item => {
    html += `<div class="drop-zone" data-target="\${item.id}">\${item.deskripsi}</div>`;
  });
  html += '</div></div>';
  html += '<div class="feedback-msg" id="drag-feedback"></div>';

  container.innerHTML = html;

  // Add Event Listeners
  const draggables = document.querySelectorAll('.draggable-item');
  const dropZones = document.querySelectorAll('.drop-zone');
  const feedback = document.getElementById('drag-feedback');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
      setTimeout(() => e.target.style.opacity = '0.5', 0);
    });
    draggable.addEventListener('dragend', (e) => {
      e.target.style.opacity = '1';
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!zone.classList.contains('matched')) {
        zone.classList.add('drag-over');
      }
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      
      if (zone.classList.contains('matched')) return;

      const draggedId = e.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(draggedId);
      const targetId = zone.getAttribute('data-target');

      if (draggedElement && draggedElement.getAttribute('data-id') === targetId) {
        // Success match
        zone.innerHTML = '';
        zone.appendChild(draggedElement);
        zone.classList.add('matched');
        draggedElement.draggable = false;
        draggedElement.style.margin = '0';
        
        feedback.style.color = 'var(--warna-sukses)';
        feedback.innerText = 'Benar! Cocok!';
        
        matchedCount++;
        if (matchedCount === gameData.length) {
          feedback.innerText = 'Luar Biasa! Semua profesi berhasil dicocokkan! 🎉';
          window.dkvCore.markComponentDone('1a', 'drag_match');
        }
      } else {
        // Wrong match
        feedback.style.color = 'var(--warna-bahaya)';
        feedback.innerText = 'Oops! Coba cocokan lagi.';
        // shake animation can be added here
      }
      
      // Clear feedback after 2s
      setTimeout(() => { if (matchedCount < gameData.length) feedback.innerText = ''; }, 2000);
    });
  });
};
