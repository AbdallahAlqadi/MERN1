var form=document.getElementById('form')
form.addEventListener('submit', async function(e) {
    e.preventDefault(); // منع الإرسال التلقائي للنموذج

    // الحصول على القيم الحالية من الحقول
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    const userData = {
        username: username,
        email: email,
        password: password
    };


    try {
        const response = await fetch('http://127.0.0.1:5002/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // تحقق مما إذا كانت الاستجابة ناجحة
        if (!response.ok) {
            const errorText = await response.text(); // قراءة نص الاستجابة
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        }

        // تحويل الاستجابة إلى JSON
        const data = await response.json();
        console.log('Success:', data); // طباعة البيانات المستلمة من الـ backend

    } catch (error) {
        console.error('Error:', error); // التعامل مع الخطأ في حال حدوثه
    }
});
