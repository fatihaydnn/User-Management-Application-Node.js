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
        // burada token ı cookie ye yaz
        document.cookie = JSON.stringify({tokenData : data.data });
        document.location.href = "/user";
      }else{
        alert("Kullanıcı Bulunamadı...")
      }
    });

    posting.fail(function( data ) {
        alert("Hata")
        console.log(data)
       });
  });


