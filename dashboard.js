const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

document.getElementById('welcome').innerHTML = `خوش آمدید، ${currentUser.fullname} 👋`;

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        // درصدها
        const videoPercent = Math.round((currentUser.videosWatched / currentUser.totalVideos) * 100);
        const pdfPercent = Math.round((currentUser.pdfsRead / currentUser.totalPdfs) * 100);
        document.getElementById('videoProgress').innerHTML = 
            `${currentUser.videosWatched} از ${currentUser.totalVideos} (${videoPercent}%)`;
        document.getElementById('pdfProgress').innerHTML = 
            `${currentUser.pdfsRead} از ${currentUser.totalPdfs} (${pdfPercent}%)`;

        // هم‌گروهی‌ها
        const group = data.groups.find(g => g.name === currentUser.groupName);
        const members = data.users.filter(u => group.members.includes(u.id) && u.id !== currentUser.id);
        
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
