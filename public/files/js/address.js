$(document).ready(function () {
    console.log("ready!");
      
    fetch("http://localhost:3000/address/getAddresses", {
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

          result.data.map((address, i) => {
            $('#listaddress').append('<a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+ address.title +'</h5></div><p class="mb-1">'+ address.longAddress+'</p><small class="text-muted">'+ address.city.cityName +' / '+ address.district.districtName + ' / '+ address.street.streetName +' Mahallesi' +'</small></a>');
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