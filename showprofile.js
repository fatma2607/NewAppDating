
var form = document.getElementById ("form")

//Sætter værdierne ind i felterne så brugeren kan se det
document.addEventListener('DOMContentLoaded', function() {
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
                    //Show user profile data
                    document.getElementById("userid").innerHTML = JSON.stringify(data[10].value).replace(/\"/g, "");
                    document.getElementById("profileemail").innerHTML = JSON.stringify(data[2].value).replace(/\"/g, "");
                    document.getElementById("name").innerHTML = "Name :" +  JSON.stringify(data[0].value).replace(/\"/g, "");
                    document.getElementById("age").innerHTML = "Age :" +  JSON.stringify(data[1].value).replace(/\"/g, "");
                    document.getElementById("email").innerHTML = "Email :" +  JSON.stringify(data[2].value).replace(/\"/g, "");
                    document.getElementById("gender").innerHTML = "Gender :" +  JSON.stringify(data[6].value).replace(/\"/g, "");
                    document.getElementById("interests").innerHTML = "Interests :" +  JSON.stringify(data[8].value).replace(/\"/g, "");
                    document.getElementById("city").innerHTML = "City :" +  JSON.stringify(data[7].value).replace(/\"/g, "");
                    document.getElementById("profileimage").src = JSON.stringify(data[5].value).replace(/\"/g, "");
                   
                    //Populate Update user profile data

                    document.getElementById("txtuserid").value = JSON.stringify(data[10].value).replace(/\"/g, "");
                    document.getElementById("txtname").value = JSON.stringify(data[0].value).replace(/\"/g, "");
                    document.getElementById("txtage").value = JSON.stringify(data[1].value).replace(/\"/g, "");
                    document.getElementById("txtemail").value =  JSON.stringify(data[2].value).replace(/\"/g, "");
                    document.getElementById("txtcity").value =  JSON.stringify(data[7].value).replace(/\"/g, "");
                    document.getElementById("txtpassword").value = JSON.stringify(data[3].value).replace(/\"/g, "");

                    //En knap som er connected til db som så kan opdatere databasen

                    
                });  
            }
        )
        .catch(function (err){
            console.log(err);
        });
 }, false);

 //Opdater useren 

 form.addEventListener("submit", function(e) {
    e.preventDefault()

        var userid = document.getElementById("txtuserid").value
        var name = document.getElementById("txtname").value
        var age = document.getElementById("txtage").value
        var email = document.getElementById("txtemail").value
        var password = document.getElementById("txtpassword").value
        var city = document.getElementById("txtcity").value
        
        fetch("https://nyeksamenprojekt.azurewebsites.net/api/updateprofile?",{
            method: 'POST',
            body: JSON.stringify({
                userid:userid,
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

//matches
var getButton = document.getElementById("getmatches")
//Gamle http adresse lokal
//http://localhost:7071/api/NyFunktionEksamen
getButton.addEventListener("click", function(){
    var name1 = document.getElementById("userid").value
    fetch(`https://nyeksamenprojekt.azurewebsites.net/api/matches?`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt" + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                   console.log(JSON.stringify(data[0].value));

                });
            }
        )
        .catch(function (err){
            console.log(err);
        });
})

