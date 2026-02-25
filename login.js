function login() {
    const code = document.getElementById('nationalCode').value.trim();
    if (!code) {
        showError('کد ملی را وارد کنید');
        return;
    }

    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const user = data.users.find(u => u.nationalCode === code);
            if (user) {
                // ذخیره اطلاعات کاربر در sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                showError('کاربری با این کد ملی یافت نشد');
            }
        })
        .catch(err => {
            showError('خطا در ارتباط با سرور');
        });
}

function showError(msg) {
    document.getElementById('error').textContent = msg;
}
