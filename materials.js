const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        let stagesHtml = '';
        data.stages.forEach(stage => {
            stagesHtml += `
                <div class="stage-card" onclick="goToStage(${stage.id})">
                    <h3>${stage.name}</h3>
                    <p>${stage.videos.length} ویدیو | ${stage.pdfs.length} PDF</p>
                </div>
            `;
        });
        document.getElementById('stagesList').innerHTML = stagesHtml;
    });

function goToStage(stageId) {
    window.location.href = `stage.html?stage=${stageId}`;
}

function goBack() {
    window.location.href = 'dashboard.html';
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
