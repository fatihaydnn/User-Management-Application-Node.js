$(document).ready(function () {
    console.log("Hazırr!");
    // let cookieObject = JSON.parse(document.cookie);
    // let token = cookieObject.tokenData.token;
  
    fetch("http://localhost:3000/user/log", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //token: token
      }
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          console.log("hazırr2");
          result.data.map((log, i) => {
            $('#loglist').append('<tr id="' + i + '"><td class="text-center" >' + log.id + '</td><td class="text-center" >' + log.type + '</td><td class="text-center" >' + log.user.name + '</td><td class="text-center" >' + log.createdAt + '<td class="text-center"></td></tr>');
          })
        } else {
          // hata
          alert("Hata Oluştu!");
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error)
      })
  });

//   var posting = $.post( "http://localhost:3000/user/login", { email : email, password : password } );
   
//     // Put the results in a div(Login olurken tokenımızı tutuyoruz.)
//     posting.done(function( data ) {
//       if(data.success){
//         //console.log(data)
//         // burada token ı cookie ye yaz
//         document.cookie = JSON.stringify({tokenData : data.data})
//         document.location.href = "/user";
//       }else{
//         alert("Kullanıcı Bulunamadı...")
//       } 