
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