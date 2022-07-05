$("#login").submit(function( event ) {
 
    // Stop form from submitting normally
    event.preventDefault();
   
    // Get some values from elements on the page:
    var $form = $( this ),
      email = $form.find( "input[name='email']" ).val(),
      password = $form.find( "input[name='password']" ).val();
   
    // Send the data using post
    var posting = $.post( "http://localhost:3000/user/login", { email : email, password : password } );
   
    // Put the results in a div(Login olurken tokenımızı tutuyoruz.)
    posting.done(function( data ) {
      if(data.success){
        //console.log(data)
        fetch("http://localhost:3000/user/all", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                 token: data.data.token
            }
          })
            .then((result) => result.json())
            .then((result) => {
               console.log(result)
               alert("Kullanıcı girişi başarılı!!")
            })
            .catch((error) => {
                console.log(error)
            })
      }else{
        alert("Kullanıcı Bulunamadı...")
      }
    });

    posting.fail(function( data ) {
        alert("Hata")
        console.log(data)
       });
  });


