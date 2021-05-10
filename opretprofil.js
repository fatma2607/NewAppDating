
var form = document.getElementById ("form")

form.addEventListener("submit", function(e) {
    e.preventDefault()

        var name = document.getElementById("name").value
        var age = document.getElementById("age").value
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var profileimage = document.getElementById("profileimage").value
        var gender = document.getElementById("gender").value
        var city = document.getElementById("city").value
        var interests = document.getElementById("interests").value
        
        fetch("https://nyeksamenprojekt.azurewebsites.net/api/Datingfunction?code=cdLmRW5Luxu5nkRKxmaOievpZbV7XFFqVjHGLzBNVH4cfaL2kcu3Zw==",{
            method: 'POST',
            body: JSON.stringify({
                name:name,
                age:age,
                email:email,
                password:password,
                profileimage:profileimage,
                gender:gender,
                city:city,
                interests:interests,

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

