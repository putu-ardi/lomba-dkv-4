/**
 * Core utility functions for handling LocalStorage and Progress
 */
const STORAGE_KEY = 'dkv_progress';
const PROFILE_KEY = 'dkv_profile';

const defaultState = {
  modul_1a: { status: 'belum', skor_kuis: null, komponen_selesai: [], timestamp_terakhir: null },
  modul_1b: { status: 'belum', skor_kuis: null, komponen_selesai: [], timestamp_terakhir: null },
  modul_1c: { status: 'belum', skor_kuis: null, komponen_selesai: [], timestamp_terakhir: null },
  kuis_akhir: { skor: null, sudah_dikerjakan: false }
};

// Initialize or get state
function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : JSON.parse(JSON.stringify(defaultState));
  } catch (e) {
    console.error("Error reading from LocalStorage", e);
    return JSON.parse(JSON.stringify(defaultState));
  }
}

// Save state
function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispatch custom event so UI can update
    window.dispatchEvent(new CustomEvent('progressUpdated', { detail: state }));
    // Tempelkan state terbaru ke semua link navigasi
    if(typeof attachStateToLinks === 'function') attachStateToLinks();
  } catch (e) {
    console.error("Error writing to LocalStorage", e);
  }
}

// Mark a component as done
function markComponentDone(moduleId, componentId) {
  const key = moduleId.startsWith('modul_') ? moduleId : `modul_${moduleId}`;
  const state = getProgress();
  if (state[key]) {
    if (!state[key].komponen_selesai.includes(componentId)) {
      state[key].komponen_selesai.push(componentId);
      state[key].timestamp_terakhir = new Date().toISOString();
      state[key].status = state[key].status === 'selesai' ? 'selesai' : 'sedang';
      saveProgress(state);
    }
  }
}

// Update module quiz score
function updateModuleQuiz(moduleId, score) {
  const key = moduleId.startsWith('modul_') ? moduleId : `modul_${moduleId}`;
  const state = getProgress();
  if (state[key]) {
    // Hanya simpan skor tertinggi
    if (state[key].skor_kuis === null || score > state[key].skor_kuis) {
       state[key].skor_kuis = score;
    }
    // Modul dinyatakan selesai HANYA jika skor >= 80
    state[key].status = state[key].skor_kuis >= 80 ? 'selesai' : 'sedang';
    state[key].timestamp_terakhir = new Date().toISOString();
    
    // Pastikan quiz masuk ke komponen_selesai
    if (!state[key].komponen_selesai.includes('quiz')) {
       state[key].komponen_selesai.push('quiz');
    }
    saveProgress(state);
  }
}

// --- Profile Functions --- //
function getProfile() {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving profile", e);
  }
}

// Render User Info if profile exists
function renderUserInfo() {
  const profile = getProfile();
  if (profile) {
    const state = getProgress();
    let displayedPoints = 0;
    let pointsLabel = "Poin";
    
    const currentUrl = window.location.href;
    
    if (currentUrl.includes('modul-1a')) {
       displayedPoints = state.modul_1a && state.modul_1a.skor_kuis ? state.modul_1a.skor_kuis : 0;
       pointsLabel = "Poin Modul 1A";
    } else if (currentUrl.includes('modul-1b')) {
       displayedPoints = state.modul_1b && state.modul_1b.skor_kuis ? state.modul_1b.skor_kuis : 0;
       pointsLabel = "Poin Modul 1B";
    } else if (currentUrl.includes('modul-1c')) {
       displayedPoints = state.modul_1c && state.modul_1c.skor_kuis ? state.modul_1c.skor_kuis : 0;
       pointsLabel = "Poin Modul 1C";
    } else if (currentUrl.includes('kuis-akhir')) {
       displayedPoints = state.kuis_akhir && state.kuis_akhir.skor ? state.kuis_akhir.skor : 0;
       pointsLabel = "Poin Ujian Akhir";
    } else {
       // Dashboard - Total Points
       let totalPoints = 0;
       ['modul_1a', 'modul_1b', 'modul_1c'].forEach(mod => {
         if (state[mod] && state[mod].skor_kuis) totalPoints += state[mod].skor_kuis;
       });
       displayedPoints = totalPoints;
       pointsLabel = "Total Poin";
    }

    const containers = document.querySelectorAll('#user-info-container');
    containers.forEach(container => {
      container.innerHTML = `
        <div class="user-info-bar fade-in" style="display: flex; justify-content: space-between; align-items: center; background: white; padding: var(--spasi-4) var(--spasi-6); border-radius: var(--radius-lg); margin-bottom: var(--spasi-6); box-shadow: var(--bayangan-sm); border-left: 5px solid var(--warna-primer);">
          <div>
            <div style="font-size: 1.1rem; margin-bottom: 4px;">Halo, <strong style="color: var(--warna-primer);">${profile.nama}</strong>!</div>
            <div style="font-size: 0.9rem; color: var(--warna-netral-600);">NISN: <strong>${profile.nisn}</strong> | Sekolah: <strong>${profile.smk}</strong></div>
          </div>
          <div style="background: var(--warna-sukses); color: white; padding: 10px 20px; border-radius: 30px; font-weight: 800; font-size: 1.2rem; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
            🌟 ${displayedPoints} ${pointsLabel}
          </div>
        </div>
      `;
    });
  }
}

// Global Profile & State Sync via URL (Mengatasi isolasi origin file:///)
function syncStateFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const uNisn = urlParams.get('nisn');
  const uNama = urlParams.get('nama');
  const uSmk = urlParams.get('smk');
  const uState = urlParams.get('state');
  
  let dataInjected = false;
  if (uNisn && uNama && uSmk) {
    saveProfile({ nisn: uNisn, nama: uNama, smk: uSmk });
    dataInjected = true;
  }
  
  if (uState) {
    try {
      // Validasi JSON
      JSON.parse(uState);
      localStorage.setItem(STORAGE_KEY, uState);
      dataInjected = true;
    } catch(e) {}
  }

  if (dataInjected) {
    try { window.history.replaceState({}, document.title, window.location.pathname); } catch(e) {}
  }
}

// Menempelkan Profil & Progress ke semua Link navigasi lokal
function attachStateToLinks() {
  const profile = getProfile();
  const state = getProgress();
  
  let qsParams = new URLSearchParams();
  if (profile) {
    qsParams.set('nisn', profile.nisn);
    qsParams.set('nama', profile.nama);
    qsParams.set('smk', profile.smk);
  }
  qsParams.set('state', JSON.stringify(state));
  
  const qs = '?' + qsParams.toString();
  
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && href.includes('.html')) {
      const cleanHref = href.split('?')[0];
      link.href = cleanHref + qs;
    }
  });
}

// Global Profile Check
function checkProfileGlobal() {
  syncStateFromUrl();

  const profile = getProfile();
  if (!profile) {
    const modalHtml = `
      <div class="modal-overlay active" id="global-profile-modal" style="z-index: 9999;">
        <div class="modal-content">
          <h2 style="margin-bottom: var(--spasi-2);">Selamat Datang!</h2>
          <p style="margin-bottom: var(--spasi-6); color: var(--warna-netral-800);">Silakan lengkapi data diri Anda sebelum memulai.</p>
          <form id="global-profile-form">
            <div class="form-group">
              <label for="g-nisn">NISN</label>
              <input type="text" id="g-nisn" class="form-control" required placeholder="Masukkan NISN">
            </div>
            <div class="form-group">
              <label for="g-nama">Nama Lengkap</label>
              <input type="text" id="g-nama" class="form-control" required placeholder="Masukkan Nama">
            </div>
            <div class="form-group">
              <label for="g-smk">Asal SMK</label>
              <input type="text" id="g-smk" class="form-control" required placeholder="Contoh: SMKN 1 Klungkung">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: var(--spasi-4);">Simpan Data</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('global-profile-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const nisn = document.getElementById('g-nisn').value.trim();
      const nama = document.getElementById('g-nama').value.trim();
      const smk = document.getElementById('g-smk').value.trim();
      if(nisn && nama && smk) {
         saveProfile({nisn, nama, smk});
         document.getElementById('global-profile-modal').remove();
         renderUserInfo();
         attachStateToLinks();
      }
    });
  } else {
    renderUserInfo();
    attachStateToLinks();
  }
}

// Render Global Footer
function renderFooter() {
  const footerHtml = `
    <footer class="global-footer">
      <p>dari Guru, oleh Guru, untuk Pendidikan Indonesia. <a href="https://www.ngranjing.my.id" target="_blank" rel="noopener noreferrer">Putu Ardi</a> © 2026. <a href="https://www.smkn1klk.sch.id" target="_blank" rel="noopener noreferrer">SMK Negeri 1 Klungkung</a></p>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHtml);
}

// Custom Confirm Modal (Pengganti confirm bawaan browser)
function showCustomConfirm(message, onConfirm) {
  const modalId = 'custom-confirm-modal';
  if(document.getElementById(modalId)) document.getElementById(modalId).remove();
  
  const modalHtml = `
    <div class="modal-overlay active fade-in" id="${modalId}" style="z-index: 10000; align-items: center; justify-content: center;">
      <div class="modal-content" style="text-align: center; max-width: 400px; padding: var(--spasi-8);">
        <div style="font-size: 3rem; margin-bottom: var(--spasi-2);">⚠️</div>
        <h3 style="margin-bottom: var(--spasi-2); font-weight: 800; color: var(--warna-primer);">Peringatan!</h3>
        <p style="margin-bottom: var(--spasi-6); color: var(--warna-netral-800);">${message}</p>
        <div style="display: flex; gap: var(--spasi-4); justify-content: center;">
          <button id="${modalId}-cancel" class="btn" style="background: var(--warna-netral-200); color: var(--warna-netral-800);">Batal</button>
          <button id="${modalId}-ok" class="btn" style="background: var(--warna-bahaya); color: white;">Ya, Hapus</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  document.getElementById(`${modalId}-cancel`).addEventListener('click', () => {
    document.getElementById(modalId).remove();
  });
  
  document.getElementById(`${modalId}-ok`).addEventListener('click', () => {
    document.getElementById(modalId).remove();
    onConfirm();
  });
}

// Reset progress & profile
function resetProgress() {
  showCustomConfirm('Apakah Anda yakin ingin mengulang dari awal? Seluruh progress dan profil akan dihapus permanen.', () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROFILE_KEY);
    // Bersihkan URL jika ada parameter
    try { window.history.replaceState({}, document.title, window.location.pathname); } catch(e) {}
    window.location.reload();
  });
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
  checkProfileGlobal();
  renderFooter();
});

window.dkvCore = {
  getProgress,
  saveProgress,
  markComponentDone,
  updateModuleQuiz,
  resetProgress,
  getProfile,
  saveProfile,
  renderUserInfo
};
