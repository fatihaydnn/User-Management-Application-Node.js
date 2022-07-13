$(document).ready(function () {
    console.log("ready!");
    //token parametresinne tokenı doldur sonra kontrol et bilgi yoksa login sayfasına gönder.
    // burada window fatih yerine token kontrolü yapacaksın
    if (String(document.cookie).trim() !== "" ) {
        let cookieData = JSON.parse(document.cookie);
        if (cookieData.tokenData.token) {
            // token var
            window.location.href = "/user";
        } else {
            // token yok login ol
            window.location.href = "/login";
        }
    } else {
        window.location.href = "/login";
    }
})