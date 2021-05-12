

var form = document.getElementById ("form")

 //checklogindetail

 form.addEventListener("submit", function(e) {
    e.preventDefault()

        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
    
        fetch("https://nyeksamenprojekt.azurewebsites.net/api/checklogindetail?",{
            method: 'POST',
            body: JSON.stringify({
                email:email,
                password:password,
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        
        })
        .then((response) =>{
            return response.json()
        })
        .then((data) => {
            console.log(data);
            let userid = JSON.stringify(data[10].value).replace(/\"/g, "");
            console.log("setting user to logged in");
            setloggedin(userid);
            console.log("user has been set to logged in");
            stayloggedin();
        }).catch((err) => {
            console.log(err)
        });
});

//login
function setloggedin (userid) {

        fetch("https://nyeksamenprojekt.azurewebsites.net/api/login?",{
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
            console.log(data);
        }).catch((err) => {
            console.log(err)
        });
};

function stayloggedin(){

    //Vi indsætter en key
    const inpKey = "loggedinuseremail";
    const inpValue = document.getElementById("email");
            
        //alert("Value is " + inpValue.value);
        localStorage.setItem(inpKey,inpValue.value);
        location.reload();

};