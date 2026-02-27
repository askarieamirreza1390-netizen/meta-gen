const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

const urlParams = new URLSearchParams(window.location.search);
const stageId = parseInt(urlParams.get('stage'));

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const stage = data.stages.find(s => s.id === stageId);
        if (!stage) {
            window.location.href = 'materials.html';
            return;
        }

        document.getElementById('stageName').textContent = stage.name;

        // نمایش ویدیوها
        let videosHtml = '';
        stage.videos.forEach(video => {
            const watched = isVideoWatched(currentUser.nationalCode, video.id);
            videosHtml += `
                <div class="item-card" data-id="${video.id}">
                    <h4>${video.title}</h4>
                    <div class="video-container">
                        <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <button class="watch-btn ${watched ? 'watched' : ''}" onclick="toggleVideo('${video.id}')">
                        ${watched ? '✅ مشاهده شده' : '◻️ مشاهده نشده'}
                    </button>
                </div>
            `;
        });
        document.getElementById('videosList').innerHTML = videosHtml || '<p>ویدیویی موجود نیست</p>';

        // نمایش PDFها
        let pdfsHtml = '';
        stage.pdfs.forEach(pdf => {
            const read = isPdfRead(currentUser.nationalCode, pdf.id);
            pdfsHtml += `
                <div class="item-card" data-id="${pdf.id}">
                    <h4>${pdf.title}</h4>
                    <a href="${pdf.url}" target="_blank" class="pdf-link">📥 دانلود PDF</a>
                    <iframe src="${pdf.url}" class="pdf-viewer"></iframe>
                    <button class="watch-btn ${read ? 'watched' : ''}" onclick="togglePdf('${pdf.id}')">
                        ${read ? '✅ مشاهده شده' : '◻️ مشاهده نشده'}
                    </button>
                </div>
            `;
        });
        document.getElementById('pdfsList').innerHTML = pdfsHtml || '<p>PDFای موجود نیست</p>';
    });

function toggleVideo(videoId) {
    markVideoWatched(currentUser.nationalCode, videoId);
    const btn = document.querySelector(`.item-card[data-id="${videoId}"] .watch-btn`);
    if (btn) {
        btn.textContent = '✅ مشاهده شده';
        btn.classList.add('watched');
    }
}

function togglePdf(pdfId) {
    markPdfRead(currentUser.nationalCode, pdfId);
    const btn = document.querySelector(`.item-card[data-id="${pdfId}"] .watch-btn`);
    if (btn) {
        btn.textContent = '✅ مشاهده شده';
        btn.classList.add('watched');
    }
}

function goBack() {
    window.location.href = 'materials.html';
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
