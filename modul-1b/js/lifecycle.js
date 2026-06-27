window.initLifecycle = function(lifecycleData) {
  const container = document.getElementById('lifecycle-container');
  container.innerHTML = '';
  
  if (!document.getElementById('lifecycle-style')) {
    const style = document.createElement('style');
    style.id = 'lifecycle-style';
    style.innerHTML = `
      .lc-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spasi-4);
        justify-content: center;
        align-items: stretch;
      }
      .lc-step {
        flex: 1;
        min-width: 150px;
        background: white;
        border: 2px solid var(--warna-netral-100);
        border-radius: var(--radius-md);
        padding: var(--spasi-4);
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        position: relative;
      }
      .lc-step:hover {
        border-color: var(--warna-primer);
        transform: translateY(-5px);
        box-shadow: var(--bayangan-md);
      }
      .lc-icon {
        font-size: 3rem;
        margin-bottom: var(--spasi-2);
      }
      .lc-detail {
        display: none;
        margin-top: var(--spasi-2);
        font-size: var(--teks-sm);
        color: var(--warna-netral-600);
        background: var(--warna-netral-100);
        padding: var(--spasi-2);
        border-radius: var(--radius-sm);
      }
      .lc-step.active .lc-detail {
        display: block;
      }
      .lc-step.active {
        border-color: var(--warna-primer);
      }
    `;
    document.head.appendChild(style);
  }

  let html = '<div class="lc-wrapper">';
  lifecycleData.forEach((item, index) => {
    html += `
      <div class="lc-step fade-in" style="animation-delay: ${index * 0.1}s">
        <div class="lc-icon">${item.ikon}</div>
        <h4 style="margin:0;">${item.tahap}</h4>
        <div class="lc-detail">${item.detail}</div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;

  const steps = container.querySelectorAll('.lc-step');
  steps.forEach(step => {
    step.addEventListener('click', () => {
      // Toggle active class
      const isActive = step.classList.contains('active');
      steps.forEach(s => s.classList.remove('active'));
      if (!isActive) step.classList.add('active');
      
      window.dkvCore.markComponentDone('1b', 'lifecycle');
    });
  });
};
