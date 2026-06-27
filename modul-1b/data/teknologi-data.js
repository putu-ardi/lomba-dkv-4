window.dkvData1B = {
  "timeline": [
    { "tahun": "1040", "era": "Pi Sheng", "deskripsi": "Penemuan cetak huruf lepas (Movable Type) dari tanah liat di Tiongkok.", "ikon": "📜" },
    { "tahun": "1440", "era": "Gutenberg", "deskripsi": "Johannes Gutenberg menciptakan mesin cetak modern pertama dengan huruf logam.", "ikon": "🖨️" },
    { "tahun": "1796", "era": "Litografi", "deskripsi": "Alois Senefelder menemukan teknik cetak datar menggunakan batu kapur.", "ikon": "🪨" },
    { "tahun": "1960s", "era": "Phototypesetting", "deskripsi": "Teknologi optik dan fotografis menggantikan huruf logam cair.", "ikon": "📷" },
    { "tahun": "1980s", "era": "Desktop Publishing", "deskripsi": "Era digital dimulai! Komputer Macintosh dan printer laser mengubah desain secara drastis.", "ikon": "💻" },
    { "tahun": "2020+", "era": "AI & Generatif", "deskripsi": "Kecerdasan buatan mulai membantu otomatisasi desain dan personalisasi konten tanpa batas.", "ikon": "🤖" }
  ],
  "lifecycle": [
    { "tahap": "Pengadaan Bahan", "detail": "Kayu, air, dan energi untuk produksi kertas.", "ikon": "🌲" },
    { "tahap": "Proses Pracetak & Cetak", "detail": "Desain, pembuatan pelat, dan penggunaan tinta, bahan kimia, serta energi mesin.", "ikon": "🏭" },
    { "tahap": "Distribusi", "detail": "Transportasi produk cetak yang menghasilkan emisi karbon.", "ikon": "🚚" },
    { "tahap": "Penggunaan", "detail": "Brosur, buku, atau kemasan yang dimanfaatkan konsumen.", "ikon": "📖" },
    { "tahap": "Akhir Hayat", "detail": "Produk dibuang ke tempat sampah atau didaur ulang.", "ikon": "♻️" }
  ],
  "sorting": [
    { "id": "s1", "aksi": "Menggunakan kertas cetak dua sisi (duplex).", "kategori": "reduce" },
    { "id": "s2", "aksi": "Mengirimkan e-invitation alih-alih undangan fisik.", "kategori": "reduce" },
    { "id": "s3", "aksi": "Mengubah sisa kertas salah cetak menjadi bloknot.", "kategori": "reuse" },
    { "id": "s4", "aksi": "Memakai kemasan lama sebagai wadah penyimpanan.", "kategori": "reuse" },
    { "id": "s5", "aksi": "Mengumpulkan botol tinta kosong ke fasilitas pengolahan limbah.", "kategori": "recycle" },
    { "id": "s6", "aksi": "Mengolah kardus kemasan menjadi pulp kertas baru.", "kategori": "recycle" }
  ],
  "branching": [
    {
      "skenario": "Klien memesan 10.000 pamflet promosi. Anggaran terbatas, namun perusahaan klien ingin menonjolkan nilai 'ramah lingkungan'.",
      "opsiA": {
        "teks": "Pilih kertas HVS biasa yang murah agar hemat anggaran, dan sisanya untuk biaya iklan digital.",
        "skor": -10,
        "feedback": "Klien kecewa. Pesan 'ramah lingkungan' perusahaan terlihat hipokrit karena material cetak tidak mendukungnya."
      },
      "opsiB": {
        "teks": "Pilih kertas daur ulang (FSC Certified) dan tinta berbasis kedelai (Soy Ink).",
        "skor": 20,
        "feedback": "Hebat! Klien sangat puas. Walau anggaran cetak sedikit naik, reputasi brand mereka meningkat tajam."
      }
    },
    {
      "skenario": "Desain kemasan produk makanan yang bentuk potongannya banyak meninggalkan sisa kertas (waste).",
      "opsiA": {
        "teks": "Ubah struktur pola pisau pond (die-cut) kemasan agar lebih kotak sehingga memaksimalkan area kertas.",
        "skor": 20,
        "feedback": "Luar biasa! Desain yang efisien menghemat biaya kertas dan meminimalisir limbah produksi."
      },
      "opsiB": {
        "teks": "Biarkan saja karena bentuk aslinya lebih unik dan menarik.",
        "skor": -10,
        "feedback": "Banyak kertas terbuang sia-sia yang akhirnya menjadi limbah tumpukan sampah industri."
      }
    },
    {
      "skenario": "Klien ingin membuat kartu undangan acara, namun tidak tahu mau dicetak fisik atau digital.",
      "opsiA": {
        "teks": "Dorong klien untuk mencetak fisik di kertas premium berlapis plastik agar terlihat eksklusif.",
        "skor": -15,
        "feedback": "Kertas berlapis laminasi plastik sangat sulit didaur ulang dan membebani lingkungan."
      },
      "opsiB": {
        "teks": "Sarankan penggunaan E-Invitation dengan desain animasi interaktif yang elegan.",
        "skor": 25,
        "feedback": "Tepat sekali! Menghilangkan emisi karbon dari transportasi pengiriman dan sama sekali tidak menyisakan sampah fisik."
      }
    },
    {
      "skenario": "Studio Anda menggunakan botol tinta printer berukuran kecil yang cepat habis.",
      "opsiA": {
        "teks": "Beli botol tinta yang lebih besar (bulk) atau sistem infus untuk mengurangi sampah kemasan tinta.",
        "skor": 15,
        "feedback": "Pilihan bijak! Membeli kemasan besar akan sangat mengurangi produksi sampah plastik harian."
      },
      "opsiB": {
        "teks": "Lanjutkan beli yang kecil karena lebih praktis disimpan di laci.",
        "skor": -5,
        "feedback": "Sampah plastik botol kecil menumpuk dan mencemari lingkungan studio Anda."
      }
    },
    {
      "skenario": "Klien ingin merchandise kaos acara dicetak menggunakan teknik sablon murah dengan tinta Plastisol (berbasis minyak bumi/plastik).",
      "opsiA": {
        "teks": "Sarankan beralih ke sablon DTG (Direct to Garment) dengan tinta water-based (berbasis air).",
        "skor": 20,
        "feedback": "Cerdas! Tinta berbasis air jauh lebih aman bagi lingkungan dan pekerja cetak karena tidak mengandung senyawa berbahaya."
      },
      "opsiB": {
        "teks": "Setuju saja karena plastisol warnanya lebih terang dan awet.",
        "skor": -10,
        "feedback": "Limbah tinta plastisol mengandung mikroplastik yang merusak ekosistem air jika dicuci."
      }
    }
  ],
  "kuis": [
    {
      "soal": "Teknologi mesin cetak dengan huruf logam yang memicu revolusi informasi massal di Eropa ditemukan oleh...",
      "opsi": [
        "Pi Sheng",
        "Alois Senefelder",
        "Johannes Gutenberg",
        "Steve Jobs",
        "Thomas Edison"
      ],
      "jawaban": 2
    },
    {
      "soal": "Tahapan mana yang menyerap emisi karbon terbesar saat mengirimkan produk cetak dari pabrik ke konsumen akhir?",
      "opsi": [
        "Pengadaan Bahan",
        "Proses Cetak",
        "Distribusi",
        "Penggunaan",
        "Pembuangan"
      ],
      "jawaban": 2
    },
    {
      "soal": "Menggunakan kertas bekas yang masih kosong sebelahnya sebagai coret-coretan (draft) termasuk tindakan...",
      "opsi": [
        "Reduce",
        "Reuse",
        "Recycle",
        "Repaint",
        "Replace"
      ],
      "jawaban": 1
    },
    {
      "soal": "Tinta cetak modern yang lebih ramah lingkungan dan aman dibandingkan tinta berbasis minyak bumi adalah...",
      "opsi": [
        "Tinta Akrilik",
        "Tinta Berbasis Timbal",
        "Tinta Kedelai (Soy Ink)",
        "Tinta Poster",
        "Tinta Karet"
      ],
      "jawaban": 2
    },
    {
      "soal": "Dalam perkembangan teknologi grafika, era di mana desainer dapat menata letak halaman dan tipografi sepenuhnya dari layar komputer disebut era...",
      "opsi": [
        "Litografi",
        "Phototypesetting",
        "Digital Printing",
        "Desktop Publishing",
        "Cetak Saring"
      ],
      "jawaban": 3
    }
  ]
};
