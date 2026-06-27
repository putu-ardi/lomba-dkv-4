const bankSoal = [
  // --- MODUL 1A: PROFESI DKV ---
  {
    tipe: 'pilihan_ganda',
    modul: '1A',
    soal: 'Di antara profesi berikut, manakah yang memiliki tugas utama merancang alur interaksi dan kenyamanan pengguna saat menggunakan sebuah aplikasi atau situs web?',
    opsi: ['Illustrator', 'UI/UX Designer', 'Packaging Designer', 'Fotografer Komersial', 'Animator'],
    jawaban: 1
  },
  {
    tipe: 'benar_salah',
    modul: '1A',
    soal: 'Seorang Fotografer Komersial dalam ekosistem DKV hanya bertugas menekan tombol kamera dan tidak perlu memikirkan konsep pencahayaan, arahan gaya, maupun pengeditan akhir (retouching).',
    jawaban: false
  },
  {
    tipe: 'checkbox',
    modul: '1A',
    soal: 'Pilih 3 perangkat lunak (software) yang menjadi standar industri dan wajib dikuasai oleh seorang Graphic Designer profesional!',
    opsi: ['Adobe Photoshop', 'Microsoft Excel', 'Adobe Illustrator', 'CorelDraw', 'Notepad++'],
    jawaban: [0, 2, 3]
  },
  {
    tipe: 'menjodohkan',
    modul: '1A',
    soal: 'Jodohkan Profesi DKV berikut dengan produk atau luaran utama yang mereka hasilkan!',
    pasangan: [
      { kiri: 'UI/UX Designer', kanan: 'Prototipe Aplikasi (Wireframe/Mockup)' },
      { kiri: 'Packaging Designer', kanan: 'Desain Label dan Kotak Kemasan Produk' },
      { kiri: 'Animator', kanan: 'Karakter Bergerak (Motion Graphics/Film)' }
    ]
  },
  {
    tipe: 'drag_drop',
    modul: '1A',
    soal: 'Lengkapi kalimat berikut mengenai fokus pekerjaan Desainer dengan menarik kata yang tepat ke dalam kotak kosong!',
    kalimat: 'Seorang UI/UX Designer berfokus pada [DROP_0] yang dirasakan oleh pengguna aplikasi, sementara seorang Illustrator lebih banyak bekerja mengeksplorasi estetika [DROP_1] murni.',
    pilihan: ['Kenyamanan Pengalaman (Experience)', 'Visual atau Gambar', 'Bahasa Pemrograman (Coding)', 'Strategi Penjualan (Marketing)'],
    jawaban: [0, 1] // Kenyamanan (0), Visual (1)
  },

  // --- MODUL 1B: TEKNOLOGI CETAK & KEBERLANJUTAN ---
  {
    tipe: 'pilihan_ganda',
    modul: '1B',
    soal: 'Teknologi cetak yang sangat cocok digunakan untuk mencetak dokumen dalam jumlah sedikit (oplah kecil) dengan waktu yang sangat cepat, karena tidak memerlukan pembuatan pelat master adalah...',
    opsi: ['Cetak Sablon (Screen Printing)', 'Cetak Offset', 'Digital Printing', 'Cetak Dalam (Rotogravure)', 'Cetak Tinggi (Letterpress)'],
    jawaban: 2
  },
  {
    tipe: 'benar_salah',
    modul: '1B',
    soal: 'Penggunaan Tinta Kedelai (Soy Ink) dan kertas bersertifikat FSC (Forest Stewardship Council) merupakan salah satu wujud nyata dari penerapan prinsip keberlanjutan (sustainability) dalam industri grafika.',
    jawaban: true
  },
  {
    tipe: 'checkbox',
    modul: '1B',
    soal: 'Manakah dari praktik berikut yang mencerminkan konsep desain yang ramah lingkungan (eco-friendly)? (Pilih 2 jawaban)',
    opsi: ['Menggunakan laminasi plastik tebal pada seluruh desain brosur', 'Mengurangi area cetak padat blok tinta (ink coverage)', 'Memilih material kertas hasil daur ulang', 'Mencetak dokumen draf yang tidak perlu dalam jumlah banyak'],
    jawaban: [1, 2]
  },
  {
    tipe: 'menjodohkan',
    modul: '1B',
    soal: 'Jodohkan teknologi cetak berikut dengan karakteristik utama prosesnya!',
    pasangan: [
      { kiri: 'Cetak Sablon (Screen)', kanan: 'Tinta ditekan menembus kain kasa atau saringan' },
      { kiri: 'Cetak Offset', kanan: 'Menggunakan silinder karet (blanket) untuk produksi koran/majalah' },
      { kiri: 'Digital Printing', kanan: 'Cetak instan dari file digital, mirip printer rumahan tapi skala besar' }
    ]
  },
  {
    tipe: 'drag_drop',
    modul: '1B',
    soal: 'Lengkapi prinsip desain ramah lingkungan berikut!',
    kalimat: 'Untuk mengurangi jejak karbon (carbon footprint) pada karya cetak, desainer grafis disarankan untuk memaksimalkan [DROP_0] sehingga tidak banyak membuang sisa potongan kertas, serta memilih tinta berbasis [DROP_1] yang lebih mudah diurai alam.',
    pilihan: ['Ruang Kertas (Layout/Nesting)', 'Bahan Nabati (Vegetable/Soy)', 'Tinta Minyak Bumi (Petroleum)', 'Laminasi Glossy'],
    jawaban: [0, 1] // Layout (0), Nabati (1)
  },

  // --- MODUL 1C: BAHASA VISUAL & PRINSIP DESAIN ---
  {
    tipe: 'pilihan_ganda',
    modul: '1C',
    soal: 'Dalam psikologi warna visual, warna Biru sering kali dimanfaatkan oleh institusi perbankan (seperti BCA atau Mandiri) karena warna ini secara tidak sadar memancarkan pesan psikologis berupa...',
    opsi: ['Keberanian, Bahaya, dan Agresif', 'Kelaparan, Semangat, dan Keceriaan', 'Kestabilan, Profesionalisme, dan Kepercayaan', 'Kehangatan, Romantisme, dan Gairah', 'Alam, Segar, dan Keberuntungan'],
    jawaban: 2
  },
  {
    tipe: 'benar_salah',
    modul: '1C',
    soal: 'Menurut psikologi bentuk dasar, bentuk "Segitiga" (Triangle) selalu identik dengan kesan kesatuan, kelembutan, dan gerakan yang abadi tanpa sudut yang tajam.',
    jawaban: false // Karena itu adalah sifat Lingkaran
  },
  {
    tipe: 'checkbox',
    modul: '1C',
    soal: 'Berdasarkan metode pemecahan masalah Design Thinking, 3 tahap manakah yang secara berurutan dilakukan SEBELUM seorang desainer mulai membuat purwarupa visual (Prototype)?',
    opsi: ['Test (Pengujian)', 'Empathize (Berempati/Riset)', 'Ideate (Mencari Ide/Gagasan)', 'Define (Menentukan Inti Masalah)', 'Production (Produksi Massal)'],
    jawaban: [1, 3, 2] // Ini checkbox jadi urutan index tidak relevan selama ada (Empathize=1, Ideate=2, Define=3)
  },
  {
    tipe: 'menjodohkan',
    modul: '1C',
    soal: 'Jodohkan prinsip tata letak desain (C.R.A.P) berikut dengan definisi fungsionalnya secara tepat!',
    pasangan: [
      { kiri: 'Contrast (Kontras)', kanan: 'Memberi perbedaan visual mencolok agar elemen penting lebih menonjol' },
      { kiri: 'Repetition (Pengulangan)', kanan: 'Mempertahankan gaya warna/font yang sama untuk menciptakan konsistensi' },
      { kiri: 'Proximity (Kedekatan)', kanan: 'Mengelompokkan teks/gambar yang berhubungan erat agar tidak berserakan' }
    ]
  },
  {
    tipe: 'drag_drop',
    modul: '1C',
    soal: 'Lengkapi definisi prinsip tata letak Alignment (Penyelarasan)!',
    kalimat: 'Setiap elemen dalam kanvas desain tidak boleh diletakkan secara sembarangan. Harus ada garis imajiner yang [DROP_0] antar elemen, sehingga komposisi desain terlihat lebih [DROP_1] dan mudah dibaca oleh audiens.',
    pilihan: ['Menghubungkan secara visual', 'Rapi dan Terstruktur', 'Saling Menabrak', 'Berantakan dan Acak'],
    jawaban: [0, 1] // Menghubungkan (0), Rapi (1)
  }
];
