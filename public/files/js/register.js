$("#register").submit(function( event ) {
 
    // Stop form from submitting normally (tıklandığında sabit kalmasını aynı yerde kalmasını sağlıyor!!)
    event.preventDefault();
   
    // Get some values from elements on the page:(sayfada ki verileri orda vermiş olduğumuz name etiketleri sayesinde burada kolayca çekebildik!!)
    var $form = $( this ),
      name = $form.find( "input[name='name']" ).val(),
      surname = $form.find( "input[name='surname']" ).val(),
      email = $form.find( "input[name='email']" ).val(),
      password = $form.find( "input[name='password']" ).val();
   
    // Send the data using post(Apiye yolluyor)
    var posting = $.post( "http://localhost:3000/user/register", { user : { name : name, surname : surname, email : email, password : password} } );
   
   // Put the results in a div
   

  posting.done(function( data ) {
    console.log(data)  
    alert("Başarıyla Kayıt Olundu!!")
   });

  posting.fail(function( data ) {
      alert("Hata")
      console.log(data)
     });
  });