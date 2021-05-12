
//Start fra lærer
const db = require('../shared/db');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
         db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    switch (req.method) {
        case 'GET':
         get(context, req);
            break;
        case 'POST':
         post(context, req);
            break
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}
//Async så de ikke blokere, try catch hvis useren ikke er der
function get(context, req){
    try{
        let user = db.getmymacthes();
        context.res = {
            body: user
        };
        context.log(user);
        context.log(context.res);
        context.log(JSON.stringify(user));
        console.log(JSON.stringify(user));

        
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}
//Try, catch så vi ikke får en fejl
async function post(context, req){
    try{
        let payload = req.body;
        await db.insertmatches(payload)
        context.res = {
            body: {status: 'Success'}
        }
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}
//Slut fra lærer

