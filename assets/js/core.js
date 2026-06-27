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
  } catch (e) {
    console.error("Error writing to LocalStorage", e);
  }
}

// Mark a component as done
function markComponentDone(moduleId, componentId) {
  const state = getProgress();
  if (state[moduleId]) {
    if (!state[moduleId].komponen_selesai.includes(componentId)) {
      state[moduleId].komponen_selesai.push(componentId);
      state[moduleId].timestamp_terakhir = new Date().toISOString();
      state[moduleId].status = 'sedang';
      saveProgress(state);
    }
  }
}

// Update module quiz score
function updateModuleQuiz(moduleId, score) {
  const state = getProgress();
  if (state[moduleId]) {
    state[moduleId].skor_kuis = score;
    state[moduleId].status = 'selesai';
    state[moduleId].timestamp_terakhir = new Date().toISOString();
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
    const container = document.getElementById('user-info-container');
    if (container) {
      container.innerHTML = `
        <div class="user-info-bar">
          <div>Halo, <strong>${profile.nama}</strong>!</div>
          <div>NISN: <strong>${profile.nisn}</strong> | Sekolah: <strong>${profile.smk}</strong></div>
        </div>
      `;
    }
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

// Reset progress & profile
function resetProgress() {
  if(confirm('Apakah Anda yakin ingin mengulang dari awal? Seluruh progress dan profil akan dihapus.')) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROFILE_KEY);
    window.location.reload();
  }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
  renderUserInfo();
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
