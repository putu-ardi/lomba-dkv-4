window.initFlipCards = function(profesiData) {
  const container = document.getElementById('flip-cards-container');
  container.innerHTML = ''; // clear previous
  
  if (!document.getElementById('flip-card-style')) {
    const style = document.createElement('style');
    style.id = 'flip-card-style';
    style.innerHTML = `
      .flip-card {
        background-color: transparent;
        width: 100%;
        height: 250px;
        perspective: 1000px;
        cursor: pointer;
      }
      .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }
      .flip-card.flipped .flip-card-inner {
        transform: rotateY(180deg);
      }
      .flip-card-front, .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        border-radius: var(--radius-lg);
        box-shadow: var(--bayangan-md);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--spasi-4);
      }
      .flip-card-front {
        background: var(--gradien-bg);
        color: var(--warna-netral-800);
        border: 2px solid var(--warna-primer);
      }
      .flip-card-front .icon {
        font-size: 4rem;
        margin-bottom: var(--spasi-4);
      }
      .flip-card-back {
        background: var(--gradien-primer);
        color: white;
        transform: rotateY(180deg);
      }
      .flip-card-back p {
        font-size: var(--teks-sm);
      }
    `;
    document.head.appendChild(style);
  }

  const displayData = profesiData.slice(0, 6);
  
  displayData.forEach((prof, index) => {
    const card = document.createElement('div');
    card.className = 'flip-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div class="icon">${prof.ikon}</div>
          <h3 style="margin:0;">${prof.nama}</h3>
          <span style="font-size: var(--teks-xs); margin-top: var(--spasi-2); opacity: 0.6;">Klik untuk membalik</span>
        </div>
        <div class="flip-card-back">
          <h4 style="margin-bottom: var(--spasi-2);">Tugas Utama</h4>
          <p>${prof.deskripsi}</p>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      window.dkvCore.markComponentDone('1a', 'flip_cards');
    });
    
    container.appendChild(card);
  });
};
