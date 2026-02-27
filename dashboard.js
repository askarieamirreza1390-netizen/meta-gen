const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

document.getElementById('welcome').innerHTML = `خوش آمدید، ${currentUser.fullname} 👋`;

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        // محاسبه تعداد کل ویدیوها و PDFها
        let totalVideos = 0;
        let totalPdfs = 0;
        data.stages.forEach(stage => {
            totalVideos += stage.videos.length;
            totalPdfs += stage.pdfs.length;
        });

        const watchedVideos = getTotalWatchedVideos(currentUser.nationalCode);
        const readPdfs = getTotalReadPdfs(currentUser.nationalCode);

        const videoPercent = totalVideos > 0 ? Math.round((watchedVideos / totalVideos) * 100) : 0;
        const pdfPercent = totalPdfs > 0 ? Math.round((readPdfs / totalPdfs) * 100) : 0;

        document.getElementById('videoProgress').innerHTML = 
            `${watchedVideos} از ${totalVideos} (${videoPercent}%)`;
        document.getElementById('pdfProgress').innerHTML = 
            `${readPdfs} از ${totalPdfs} (${pdfPercent}%)`;

        // نمایش هم‌گروهی‌ها
        const group = currentUser.group;
        const members = data.users.filter(u => u.group === group && u.id !== currentUser.id);
        
        let membersHtml = '';
        members.forEach(m => {
            membersHtml += `
                <div class="member-item">
                    <span>${m.fullname}</span>
                    ${m.isLeader ? '<span class="leader-badge">سرگروه</span>' : ''}
                </div>
            `;
        });
        document.getElementById('groupMembers').innerHTML = membersHtml || '<p>هم‌گروهی وجود ندارد</p>';
    });

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
