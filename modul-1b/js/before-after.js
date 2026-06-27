window.initBeforeAfter = function() {
  const container = document.getElementById('before-after-container');
  container.innerHTML = '';
  
  if (!document.getElementById('before-after-style')) {
    const style = document.createElement('style');
    style.id = 'before-after-style';
    style.innerHTML = `
      .ba-wrapper {
        position: relative;
        width: 100%;
        max-width: 600px;
        height: 350px;
        background: #eee;
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--bayangan-md);
      }
      .ba-image {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;
        text-align: center; color: white; padding: 20px;
      }
      /* Analog: Sepia tone, rough grid pattern */
      .ba-before {
        background: #795548;
        background-image: radial-gradient(#5D4037 15%, transparent 16%), radial-gradient(#5D4037 15%, transparent 16%);
        background-size: 20px 20px;
        background-position: 0 0, 10px 10px;
        z-index: 1;
      }
      /* Digital: Cyberpunk/digital clean grid */
      .ba-after {
        background: #2D2DE5;
        background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px);
        background-size: 20px 20px;
        z-index: 2;
        /* clip-path will be controlled by JS */
        clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
      }
      .ba-slider {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        z-index: 3;
        opacity: 0; 
        cursor: ew-resize;
      }
      .ba-divider {
        position: absolute;
        top: 0; left: 50%; width: 4px; height: 100%;
        background: white;
        z-index: 2;
        pointer-events: none;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      }
      .ba-divider::after {
        content: '< >';
        position: absolute;
        top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; color: black;
        border-radius: 20px; padding: 5px 10px;
        font-weight: bold; font-family: monospace;
      }
    `;
    document.head.appendChild(style);
  }

  const html = `
    <div class="ba-wrapper fade-in">
      <div class="ba-image ba-before">
        <h2 style="font-size: 2rem;">ANALOG</h2>
        <p>Letterpress, pelat cetak fisik, mesin mekanik lambat.</p>
      </div>
      <div class="ba-image ba-after" id="ba-digital">
        <h2 style="font-size: 2rem;">DIGITAL</h2>
        <p>Software desain, cetak on-demand, laser/inkjet presisi.</p>
      </div>
      <div class="ba-divider" id="ba-divider"></div>
      <input type="range" min="0" max="100" value="50" class="ba-slider" id="ba-slider">
    </div>
  `;
  container.innerHTML = html;

  const slider = document.getElementById('ba-slider');
  const divider = document.getElementById('ba-divider');
  const digitalLayer = document.getElementById('ba-digital');

  slider.addEventListener('input', (e) => {
    const val = e.target.value;
    // Reveal Digital (which is originally from 50% to 100%)
    // If slider is 20%, we want digital to be from 20% to 100%
    digitalLayer.style.clipPath = `polygon(${val}% 0, 100% 0, 100% 100%, ${val}% 100%)`;
    divider.style.left = `${val}%`;
    window.dkvCore.markComponentDone('1b', 'before_after');
  });
};
