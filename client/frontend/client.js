//الفكره باختصار انه جبت data من mongodb وعرضتها في table

// الكود عباره عن اني اجيب DATA  من API(GET)
//GET: هي يلي بتجيب  البيانات من API




//get
var AllData = [];
async function getData() {
    //الرابط يلي بكون معرفه ب backend
    await fetch('http://127.0.0.1:5002/api/users')
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
                td3.innerHTML = AllData[i].phone;

                // إضافة الأعمدة إلى الصف
                tr1.append(td1);
                tr1.append(td2);
                tr1.append(td3);

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
