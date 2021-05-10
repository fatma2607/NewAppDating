
var form = document.getElementById ("form")

form.addEventListener("submit", function(e) {
    e.preventDefault()

        var name = document.getElementById("name").value
        var age = document.getElementById("age").value
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var loggedin = document.getElementById("loggedin").value
        var profileimage = document.getElementById("profileimage").value
        var gender = document.getElementById("gender").value
        var city = document.getElementById("city").value
        var interests = document.getElementById("interests").value
        var deleted = document.getElementById("deleted").value
        
        fetch("https://nyeksamenprojekt.azurewebsites.net/api/Datingfunction?code=cdLmRW5Luxu5nkRKxmaOievpZbV7XFFqVjHGLzBNVH4cfaL2kcu3Zw==",{
            method: 'POST',
            body: JSON.stringify({
                name:name,
                age:age,
                email:email,
                password:password,
                loggedin:loggedin,
                profileimage:profileimage,
                gender:gender,
                city:city,
                interests:interests,
                deleted:deleted,

            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        
        })
        .then((response) =>{
            return response.json()
        })
        .then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
})
var getButton = document.getElementById("getusers")
//Gamle http adresse lokal
//http://localhost:7071/api/NyFunktionEksamen
getButton.addEventListener("click", function(){
    var name1 = document.getElementById("name").value
    fetch(`https://nyeksamenprojekt.azurewebsites.net/api/Datingfunction?code=cdLmRW5Luxu5nkRKxmaOievpZbV7XFFqVjHGLzBNVH4cfaL2kcu3Zw==`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt" + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                    document.getElementById("APInavn").value = JSON.stringify(data[0].value);

                });
            }
        )
        .catch(function (err){
            console.log(err);
        });

        
})




