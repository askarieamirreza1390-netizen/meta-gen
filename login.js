// در ابتدای فایل، رمز عبور کلی را تعریف کنید
const MASTER_PASSWORD = 'group123'; // رمزی که با آن فایل را رمز کردید

function login() {
    const code = document.getElementById('nationalCode').value.trim();
    const pass = document.getElementById('password').value.trim();
    
    if (!code || !pass) {
        showError('کد ملی و رمز عبور را وارد کنید');
        return;
    }

    // بارگذاری و رمزگشایی اطلاعات
    loadEncryptedData(MASTER_PASSWORD).then(data => {
        if (!data) {
            showError('خطا در بارگذاری اطلاعات');
            return;
        }
        
        const user = data.users.find(u => u.nationalCode === code && u.password === pass);
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            // ذخیره کل اطلاعات برای استفاده در صفحات دیگر
            sessionStorage.setItem('appData', JSON.stringify(data));
            window.location.href = 'dashboard.html';
        } else {
            showError('کد ملی یا رمز عبور اشتباه است');
        }
    });
}
