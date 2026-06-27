window.initBranching = function(branchingDataArray) {
  const container = document.getElementById('branching-container');
  container.innerHTML = '';
  
  if (!document.getElementById('branching-style')) {
    const style = document.createElement('style');
    style.id = 'branching-style';
    style.innerHTML = `
      .branch-wrapper {
        background: var(--gradien-bg);
        border-radius: var(--radius-lg);
        padding: var(--spasi-6);
        border: 2px solid var(--warna-primer);
      }
      .branch-scene {
        font-size: var(--teks-lg);
        margin-bottom: var(--spasi-6);
        font-weight: 600;
        text-align: center;
      }
      .branch-options {
        display: flex;
        gap: var(--spasi-4);
        flex-wrap: wrap;
      }
      .branch-btn {
        flex: 1;
        min-width: 250px;
        background: white;
        border: 2px solid var(--warna-primer);
        border-radius: var(--radius-md);
        padding: var(--spasi-4);
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
        font-size: var(--teks-md);
      }
      .branch-btn:hover {
        transform: translateY(-3px);
        background: #f0f4ff;
      }
      .branch-result {
        display: none;
        margin-top: var(--spasi-6);
        padding: var(--spasi-4);
        border-radius: var(--radius-md);
        text-align: center;
        font-weight: bold;
        font-size: var(--teks-lg);
      }
    `;
    document.head.appendChild(style);
  }

  let currentIndex = 0;
  let totalSkor = 0;

  function renderScenario() {
    if (currentIndex >= branchingDataArray.length) {
      container.innerHTML = `
        <div class="branch-wrapper fade-in" style="text-align:center;">
          <h2>Simulasi Selesai!</h2>
          <p>Reputasi Lingkungan Total Anda: <strong>${totalSkor}</strong></p>
          <button class="btn btn-primary" id="restart-branch-btn">Ulangi Simulasi</button>
        </div>
      `;
      document.getElementById('restart-branch-btn').addEventListener('click', () => {
        currentIndex = 0;
        totalSkor = 0;
        renderScenario();
      });
      window.dkvCore.markComponentDone('1b', 'branching');
      return;
    }

    const data = branchingDataArray[currentIndex];
    
    const html = `
      <div class="branch-wrapper fade-in">
        <p style="text-align:center; color:var(--warna-primer); font-weight:bold;">Skenario ${currentIndex + 1} dari ${branchingDataArray.length}</p>
        <div class="branch-scene">🏢 KASUS: ${data.skenario}</div>
        <div class="branch-options" id="branch-options">
          <button class="branch-btn" id="btn-opsi-a"><strong>Opsi A:</strong><br><br>${data.opsiA.teks}</button>
          <button class="branch-btn" id="btn-opsi-b"><strong>Opsi B:</strong><br><br>${data.opsiB.teks}</button>
        </div>
        <div class="branch-result fade-in" id="branch-result"></div>
      </div>
    `;
    container.innerHTML = html;

    const btnA = document.getElementById('btn-opsi-a');
    const btnB = document.getElementById('btn-opsi-b');
    const resultDiv = document.getElementById('branch-result');
    const optionsDiv = document.getElementById('branch-options');

    function showResult(opsiData, isGood) {
      optionsDiv.style.display = 'none';
      resultDiv.style.display = 'block';
      totalSkor += opsiData.skor;
      
      if (isGood) {
        resultDiv.style.background = '#e6f6f0';
        resultDiv.style.color = 'var(--warna-sukses)';
        resultDiv.innerHTML = `✅ Keputusan Tepat!<br><br>${opsiData.feedback}<br><br>Reputasi Lingkungan: +${opsiData.skor} Poin`;
      } else {
        resultDiv.style.background = '#fde2e2';
        resultDiv.style.color = 'var(--warna-bahaya)';
        resultDiv.innerHTML = `❌ Keputusan Buruk!<br><br>${opsiData.feedback}<br><br>Reputasi Lingkungan: ${opsiData.skor} Poin`;
      }
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn btn-primary';
      nextBtn.style.marginTop = 'var(--spasi-4)';
      nextBtn.innerText = 'Lanjut ke Skenario Berikutnya';
      nextBtn.onclick = () => {
        currentIndex++;
        renderScenario();
      };
      resultDiv.appendChild(nextBtn);
    }

    btnA.addEventListener('click', () => showResult(data.opsiA, data.opsiA.skor > 0));
    btnB.addEventListener('click', () => showResult(data.opsiB, data.opsiB.skor > 0));
  }

  renderScenario();
};
