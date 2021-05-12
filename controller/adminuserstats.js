
var form = document.getElementById ("form")

//Sætter værdierne ind i felterne så brugeren kan se det
document.addEventListener('DOMContentLoaded', function() {
    
    fetch(`https://nyeksamenprojekt.azurewebsites.net/api/adminuserstats?`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt" + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                    //Show user profile data
                  //  document.getElementById("userid").innerHTML = JSON.stringify(data[10].value).replace(/\"/g, "");
                });  
            }
        )
        .catch(function (err){
            console.log(err);
        });
 }, false);







 


