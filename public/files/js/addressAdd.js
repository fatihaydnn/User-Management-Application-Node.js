$(document).ready(function () {
    fetch("http://localhost:3000/address/getAllCities", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((result) => result.json())
        .then((result) => {
            console.log(result);
            if (result.success) {
                console.log("hazırr2");
                result.data.map((city, i) => {
                    $('#cityList').append('<option key="' + i + '" value="' + city.cityCode + '">' + city.cityName + '</option>');
                })
            } else {
                // hata
                alert("Hata Oluştu!");
                console.log(result);
            }
        })
        .catch((error) => {
            console.log(error)
        });

    $("#cityList").change(function (e) {
        $('#districtList').empty();
        $('#districtList').append('<option key="0" value="0">İlçe Seçiniz</option>');
        $('#streetList').empty();
        $('#streetList').append('<option key="0" value="0">Sokak/Mahalle Seçiniz</option>');
        var cityCode = e.target.value;
        if (cityCode !== "0") {
            fetch("http://localhost:3000/address/getDistricts?cityCode=" + cityCode, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((result) => result.json())
                .then((result) => {
                    console.log(result);
                    if (result.success) {
                        console.log("ilçeler hazır");
                        result.data.map((district, i) => {
                            $('#districtList').append('<option key="' + i + '" value="' + district.districtCode + '">' + district.districtName + '</option>');
                        })
                    } else {
                        // hata
                        alert("Hata Oluştu!");
                        console.log(result);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    });

    $("#districtList").change(function (e) {
        $('#streetList').empty();
        $('#streetList').append('<option key="0" value="0">Sokak/Mahalle Seçiniz</option>');
        var districtCode = e.target.value;
        if (districtCode !== "0") {
            fetch("http://localhost:3000/address/getStreets?districtCode=" + districtCode, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((result) => result.json())
                .then((result) => {
                    console.log(result);
                    if (result.success) {
                        console.log("mahalleler hazır");
                        result.data.map((street, i) => {
                            $('#streetList').append('<option key="' + i + '" value="' + street.streetCode + '">' + street.streetName + '</option>');
                        })
                    } else {
                        // hata
                        alert("Hata Oluştu!");
                        console.log(result);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    });
});

$("#addressAdd").submit(function (event) {

    // Stop form from submitting normally (tıklandığında sabit kalmasını aynı yerde kalmasını sağlıyor!!)
    event.preventDefault();

    // Get some values from elements on the page:(sayfada ki verileri orda vermiş olduğumuz name etiketleri sayesinde burada kolayca çekebildik!!)
    var $form = $(this);
    title = $form.find("input[name='title']").val(),
        city = $form.find("select[name='city']").val(),
        district = $form.find("select[name='district']").val(),
        street = $form.find("select[name='street']").val(),
        longAddress = $form.find("textarea[name='longAddress']").val();
    // Send the data using post(Apiye yolluyor)
    console.log({ address: { title: title, city: city, district: district, street: street, longAddress: longAddress } })

    var posting = $.post("http://localhost:3000/address/all", { address: { title: title, city: city, district: district, street: street, longAddress: longAddress } });

    // Put the results in a div


    posting.done(function (data) {
        console.log(data)
        if (data.success) {
            alert("Başarıyla Kayıt Olundu!!")
            document.location.href = "/address";
        } else {
            alert("Hata Oluştu!!")
        }

    });

    posting.fail(function (data) {
        alert("Hata")
        console.log(data)
    });
});