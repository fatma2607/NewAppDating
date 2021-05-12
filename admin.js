
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
  
                });  
            }
        )
        .catch(function (err){
            console.log(err);
        });
 }, false);

//Delete
var deleteButton = document.getElementById("deleteuser")
//Gamle http adresse lokal
//http://localhost:7071/api/NyFunktionEksamen
deleteButton.addEventListener("click", function(){
    var deleteuserid = document.getElementById("txtdeleteuserid").value
    console.log("dette er deleteuserid " + deleteuserid);
    fetch("https://nyeksamenprojekt.azurewebsites.net/api/admindeleteprofile?",{
            method: 'POST',
            body: JSON.stringify({
                userid:deleteuserid 
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
 
var Logoutbtn = document.getElementById("Logout")
//Gamle http adresse lokal
//http://localhost:7071/api/NyFunktionEksamen
Logoutbtn.addEventListener("click", function(){
    var userid = document.getElementById("userid").innerHTML
    fetch("https://nyeksamenprojekt.azurewebsites.net/api/logud?",{
            method: 'POST',
            body: JSON.stringify({
                userid:userid 
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
 