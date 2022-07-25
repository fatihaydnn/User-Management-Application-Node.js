$(document).ready(function () {
  console.log("ready!");
  let cookieObject = JSON.parse(document.cookie);
  let token = cookieObject.tokenData.token;

  fetch("http://localhost:3000/user/all", {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      token: token
    }
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      if (result.success) {
        result.data.map((user, i) => {
          $('#userlist').append('<tr id="' + i + '"><td class="text-center" >' + user.id + '</td><td class="text-center" >' + user.name + '</td><td class="text-center" >' + user.surname + '</td><td class="text-center" >' + user.email + '<td class="text-center"><button  type="button" class="btn btn-danger" onclick=deleteUser("' + user.id + '",' + i + ')>Delete</button></td>' + '</td></tr>');
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

function deleteUser(userId, index) {
  // index => silmek istediğimiz satır
  // user/delete post apisini çağırz
  // success ise jquery kullanarak index ile o satırı sil (how to delete html row from table using row number jquery)
  let cookieObject = JSON.parse(document.cookie);
  let token = cookieObject.tokenData.token;
  fetch("http://localhost:3000/user/delete", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      token: token
    },
    body: JSON.stringify({
      id: userId
    })
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      if (result.success) {

        console.log("oldu!");
        $('#'+index).remove();

      } else {
        // hata
        alert("Hata 11 Oluştu!");
        console.log(result);
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
