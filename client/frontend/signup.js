var form=document.getElementById('form')
form.addEventListener('submit', async function(e) {
    e.preventDefault(); // منع الإرسال التلقائي للنموذج

    // الحصول على القيم الحالية من الحقول
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;


    //post
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







//get



var AllData = [];
async function getData() {
    //الرابط يلي بكون معرفه ب backend
    await fetch('http://127.0.0.1:5002/api/signup/users')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            AllData = data;

            var tbody = document.getElementById('tbody'); // افتراض وجود عنصر tbody بـ id 'tbody' في الـ HTML

            // التحقق من أن AllData موجودة وهي مصفوفة
            for (var i = 0; i < AllData.length; i++) {
                // إنشاء صف جديد
                var tr1 = document.createElement('tr');
                tr1.className = 'tr1-t6';

                // إنشاء عمود 'id'
                var td1 = document.createElement('td');
                td1.className = 'td1-t6';
                td1.innerHTML = AllData[i]._id;

                // إنشاء عمود 'username'
                var td2 = document.createElement('td');
                td2.className = 'td2-t6';
                td2.innerHTML = AllData[i].username;

                // إنشاء عمود 'phone'
                var td3 = document.createElement('td');
                td3.className = 'td3-t6';
                td3.innerHTML = AllData[i].email;

                var td4 = document.createElement('td');
                td4.className = 'td4-t6';
                td4.innerHTML = AllData[i].password;
                // إضافة الأعمدة إلى الصف
                tr1.append(td1);
                tr1.append(td2);
                tr1.append(td3);
                tr1.append(td4);


                // إضافة الصف إلى tbody
                tbody.append(tr1);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//استدعاء function
getData(); // Call the function to fetch and render the data
