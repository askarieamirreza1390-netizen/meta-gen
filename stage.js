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
            videosHtml += `
                <div class="item-card">
                    <h4>${video.title}</h4>
                    <div class="video-container">
                        <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            `;
        });
        document.getElementById('videosList').innerHTML = videosHtml || '<p>ویدیویی موجود نیست</p>';

        // نمایش PDFها
        let pdfsHtml = '';
        stage.pdfs.forEach(pdf => {
            pdfsHtml += `
                <div class="item-card">
                    <h4>${pdf.title}</h4>
                    <a href="${pdf.url}" target="_blank" class="pdf-link">📥 دانلود PDF</a>
                    <iframe src="${pdf.url}" class="pdf-viewer"></iframe>
                </div>
            `;
        });
        document.getElementById('pdfsList').innerHTML = pdfsHtml || '<p>PDFای موجود نیست</p>';
    });

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
