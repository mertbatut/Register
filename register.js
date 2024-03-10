function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const errorMessages = [];

    if (name.length < 3) {
        errorMessages.push("Ad en az 3 karakter olmalı.");
    }

    if (surname.length < 3) {
        errorMessages.push("Soyad en az 3 karakter olmalı.");
    }

    if (!email.includes('@') || !email.includes('.')) {
        errorMessages.push("Geçersiz email adresi.");
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/)) {
        errorMessages.push("Güçlü bir şifre gereklidir: en az 8 karakter, büyük harf, küçük harf, sembol ve sayı içermelidir.");
    }

    const errorDisplay = document.getElementById('errorMessages');
    
    if (errorMessages.length === 0) {
        fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                password: password
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Yeni kullanıcı ID: ' + data.id);
            document.getElementById('registerForm').reset();
        })
        .catch(error => console.error('Hata:', error));
        
    } else {
        errorDisplay.innerHTML = errorMessages.join("<br>");
    }
}