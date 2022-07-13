
$(document).ready(function() {
    console.log( "ready!" );
    fetch("http://localhost:3000/user/all", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
           //token: data.data.token BURADA TARAYICIDAN OKUDUGUN TOKEN YAZILACAK
        }
      })
        .then((result) => result.json())
        .then((result) => {
          console.log(result);
            if(result.success){
                result.data.map((user, i) => {
                    $('#userlist').append('<tr><td class="text-center" >'+user.id+'</td><td class="text-center" >'+user.name+'</td><td class="text-center" >'+user.surname+'</td><td class="text-center" >'+user.email+'</td></tr>');
                })
            }else{
                // hata
                alert("Hata Oluştu!");
                console.log(result);
            }
        })
        .catch((error) => {
          console.log(error)
        })
});

