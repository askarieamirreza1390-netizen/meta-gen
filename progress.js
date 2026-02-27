const STORAGE_KEY = 'studyGroupProgress';

function getUserProgress(nationalCode) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return all[nationalCode] || { videos: [], pdfs: [] };
}

function saveUserProgress(nationalCode, progress) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    all[nationalCode] = progress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function markVideoWatched(nationalCode, videoId) {
    const progress = getUserProgress(nationalCode);
    if (!progress.videos.includes(videoId)) {
        progress.videos.push(videoId);
        saveUserProgress(nationalCode, progress);
    }
}

function markPdfRead(nationalCode, pdfId) {
    const progress = getUserProgress(nationalCode);
    if (!progress.pdfs.includes(pdfId)) {
        progress.pdfs.push(pdfId);
        saveUserProgress(nationalCode, progress);
    }
}

function isVideoWatched(nationalCode, videoId) {
    const progress = getUserProgress(nationalCode);
    return progress.videos.includes(videoId);
}

function isPdfRead(nationalCode, pdfId) {
    const progress = getUserProgress(nationalCode);
    return progress.pdfs.includes(pdfId);
}

function getTotalWatchedVideos(nationalCode) {
    return getUserProgress(nationalCode).videos.length;
}

function getTotalReadPdfs(nationalCode) {
    return getUserProgress(nationalCode).pdfs.length;
}
