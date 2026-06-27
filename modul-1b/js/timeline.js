window.initTimeline = function(timelineData) {
  const container = document.getElementById('timeline-container');
  container.innerHTML = '';
  
  if (!document.getElementById('timeline-style')) {
    const style = document.createElement('style');
    style.id = 'timeline-style';
    style.innerHTML = `
      .timeline-wrapper {
        display: flex;
        overflow-x: auto;
        padding: var(--spasi-6) 0;
        gap: var(--spasi-6);
        scroll-snap-type: x mandatory;
        /* Custom scrollbar */
        scrollbar-width: thin;
        scrollbar-color: var(--warna-primer) var(--warna-netral-100);
      }
      .timeline-wrapper::-webkit-scrollbar { height: 8px; }
      .timeline-wrapper::-webkit-scrollbar-track { background: var(--warna-netral-100); border-radius: 4px; }
      .timeline-wrapper::-webkit-scrollbar-thumb { background-color: var(--warna-primer); border-radius: 4px; }
      
      .timeline-item {
        flex: 0 0 280px;
        scroll-snap-align: start;
        background: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--bayangan-sm);
        padding: var(--spasi-6);
        border-top: 5px solid var(--warna-primer);
        position: relative;
      }
      .timeline-year {
        font-family: var(--font-mono);
        color: var(--warna-primer);
        font-weight: 800;
        font-size: var(--teks-2xl);
        margin-bottom: var(--spasi-2);
      }
      .timeline-icon {
        font-size: 2.5rem;
        position: absolute;
        top: 15px;
        right: 15px;
        opacity: 0.2;
        transition: opacity 0.3s, transform 0.3s;
      }
      .timeline-item:hover .timeline-icon {
        opacity: 1;
        transform: scale(1.2);
      }
    `;
    document.head.appendChild(style);
  }

  let html = '<div class="timeline-wrapper">';
  timelineData.forEach((item, index) => {
    html += `
      <div class="timeline-item fade-in" style="animation-delay: ${index * 0.1}s;">
        <div class="timeline-icon">${item.ikon}</div>
        <div class="timeline-year">${item.tahun}</div>
        <h3 style="margin-bottom: var(--spasi-2);">${item.era}</h3>
        <p style="font-size: var(--teks-sm); color: var(--warna-netral-600);">${item.deskripsi}</p>
      </div>
    `;
  });
  html += '</div>';
  
  container.innerHTML = html;

  // Add touch listener to mark done
  const wrapper = container.querySelector('.timeline-wrapper');
  wrapper.addEventListener('scroll', () => {
    if(wrapper.scrollLeft > 100) {
      window.dkvCore.markComponentDone('1b', 'timeline');
    }
  }, { once: true });
};
