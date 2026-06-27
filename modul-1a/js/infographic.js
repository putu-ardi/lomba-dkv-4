window.initInfographic = function(ekoData) {
  const container = document.getElementById('infographic-container');
  container.innerHTML = '';
  
  if (!document.getElementById('infographic-style')) {
    const style = document.createElement('style');
    style.id = 'infographic-style';
    style.innerHTML = `
      .info-card {
        position: relative;
        overflow: hidden;
        border-radius: var(--radius-lg);
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
        cursor: pointer;
        transition: transform var(--transisi-normal);
      }
      .info-card:hover {
        transform: scale(1.03);
      }
      .info-title {
        font-size: var(--teks-lg);
        font-weight: 700;
        z-index: 2;
        transition: opacity var(--transisi-normal);
      }
      .info-desc {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spasi-4);
        opacity: 0;
        transition: opacity var(--transisi-normal);
        z-index: 3;
        font-size: var(--teks-sm);
      }
      .info-card:hover .info-desc {
        opacity: 1;
      }
      .info-card:hover .info-title {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }

  ekoData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'info-card fade-in';
    card.style.background = item.warna;
    card.style.animationDelay = `${index * 0.15}s`;
    
    card.innerHTML = `
      <div class="info-title">${item.sektor}</div>
      <div class="info-desc">${item.kontribusi}</div>
    `;
    
    card.addEventListener('click', () => {
       window.dkvCore.markComponentDone('1a', 'infographic');
    });
    card.addEventListener('mouseenter', () => {
       window.dkvCore.markComponentDone('1a', 'infographic');
    });

    container.appendChild(card);
  });
};
