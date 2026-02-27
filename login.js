function login() {
    const code = document.getElementById('nationalCode').value.trim();
    const pass = document.getElementById('password').value.trim();
    if (!code || !pass) {
        showError('کد ملی و رمز عبور را وارد کنید');
        return;
    }

    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const user = data.users.find(u => u.nationalCode === code && u.password === pass);
            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                showError('کد ملی یا رمز عبور اشتباه است');
            }
        })
        .catch(err => {
            showError('خطا در ارتباط با سرور');
        });
}

function showError(msg) {
    document.getElementById('error').textContent = msg;
}
