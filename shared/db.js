//Start fra lærer, connecte til database
const { Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')

var connection = new Connection(config)

function startDb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log("Connection failed")
                reject(err)
                throw err;
            } else {
                console.log("Connected")
                resolve();
            }
        })
        connection.connect();
    })
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;

function insert(payload){
    return new Promise((resolve, reject) => {
        const sql =  `INSERT INTO [Users](name, age, email, password, profileimage, gender, city, interests)
         VALUES ( @name, @age, @email, @password, @profileimage, @gender, @city, @interests)`

        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('age', TYPES.Int, payload.age)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('profileimage', TYPES.VarChar, payload.profileimage)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('city', TYPES.VarChar, payload.city)
        request.addParameter('interests', TYPES.VarChar, payload.interests)


        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.insert = insert;


function select(name){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [Users]`
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('name', TYPES.VarChar, name)
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}
module.exports.select = select;

//SLut fra lærer

//Opdater user 
function UpdateProfile(payload){
    return new Promise((resolve, reject) => {
        const sql =  "UPDATE dbo.Users SET interests = 'cooking', city= @city, email= @email, gender= 'male'  WHERE userid = 'AD5BC42F-0C20-45E6-ABF7-56EB29B88938'" 
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('userid', TYPES.VarChar, payload.name)
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('age', TYPES.Int, payload.age)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('profileimage', TYPES.VarChar, payload.profileimage)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('city', TYPES.VarChar, payload.city)
        request.addParameter('interests', TYPES.VarChar, payload.interests)


        request.on('requestCompleted', (row) => {
            console.log('user updated', row);
            resolve('user updated', row)
        });
        connection.execSql(request)

    });
}
module.exports.UpdateProfile = UpdateProfile;


//Matches funktionen //når begge har liket vil den gå ind og sætte dem som et match
function insertmatches(payload){
    return new Promise((resolve, reject) => {
        const sql =  'INSERT INTO [Users](name, age, email, password, profileimage, gender, city, interests) VALUES ( @name, @age, @email, @password, @profileimage, @gender, @city, @interests) '
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('age', TYPES.Int, payload.age)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('profileimage', TYPES.VarChar, payload.profileimage)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('city', TYPES.VarChar, payload.city)
        request.addParameter('interests', TYPES.VarChar, payload.interests)


        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.insertmatches = insertmatches;

//Viser de matches man har

function selectmatches(name){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [vw_matches]`
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('name', TYPES.VarChar, name)
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}
module.exports.selectmatches = selectmatches;


//Delete profile

function DeleteProfile(payload){
    console.log("deleteuserid " + payload.deleteuserid);
    return new Promise((resolve, reject) => {
        const sql =  "DELETE FROM dbo.Users WHERE userid = @deleteuserid";
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('deleteuserid', TYPES.VarChar, payload.deleteuserid)
        
        request.on('requestCompleted', (row) => {
            console.log('user deleted', row);
            resolve('user deleted', row)
        });
        connection.execSql(request)

    });
}
module.exports.DeleteProfile = DeleteProfile;

//admindeleteprofile

function admindeleteprofile(payload){
    return new Promise((resolve, reject) => {
        const sql =  "DELETE FROM dbo.Users WHERE userid = 'C0DD2A15-8CA2-4AB6-8737-D7CB5C02F517'";
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('userid', TYPES.VarChar, payload.name)
        
        request.on('requestCompleted', (row) => {
            console.log('user updated', row);
            resolve('user updated', row)
        });
        connection.execSql(request)

    });
}
module.exports.admindeleteprofile = admindeleteprofile;


//login
function Login(payload){
    return new Promise((resolve, reject) => {
        const sql =  "UPDATE dbo.Users SET loggedin = 1 WHERE userid = @userid" 
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('userid', TYPES.UniqueIdentifier, payload.userid)
        
        request.on('requestCompleted', (row) => {
            console.log('user logged in', row);
            resolve('user logged in', row)
        });
        connection.execSql(request)

    });
}
module.exports.Login = Login;

//logout
function Logout(payload){
    return new Promise((resolve, reject) => {
        const sql =  "UPDATE dbo.Users SET loggedin = 0 WHERE userid = @userid" 
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('userid', TYPES.VarChar, payload.userid)
        
        request.on('requestCompleted', (row) => {
            console.log('user logged in', row);
            resolve('user logged in', row)
        });
        connection.execSql(request)

    });
}
module.exports.Logout = Logout;

//deletematch
function DeleteMatch(payload){
    return new Promise((resolve, reject) => {
        const sql =  "DELETE [didlike] WHERE (userid = @userid AND liked_userid = @liked_userid)"
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('userid', TYPES.VarChar, payload.userid)
        request.addParameter('liked_userid', TYPES.VarChar, payload.liked_userid)

        request.on('requestCompleted', (row) => {
            console.log('Match deleted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.DeleteMatch =DeleteMatch ;

//like
function Like(payload){
    return new Promise((resolve, reject) => {
        const sql =  "INSERT INTO [didlike](userid, liked_userid) VALUES ( @userid, @liked_userid)"
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('userid', TYPES.VarChar, payload.userid)
        request.addParameter('liked_userid', TYPES.VarChar, payload.liked_userid)

        request.on('requestCompleted', (row) => {
            console.log('user liked', row);
            resolve('user liked', row)
        });
        connection.execSql(request)

    });
}
module.exports.Like =Like ;

//dislike
function DisLike(payload){
    return new Promise((resolve, reject) => {
        const sql =  "INSERT INTO [dislike](userid, disliked_userid) VALUES ( @userid, @disliked_userid)"
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('userid', TYPES.VarChar, payload.userid)
        request.addParameter('disliked_userid', TYPES.VarChar, payload.disliked_userid)

        request.on('requestCompleted', (row) => {
            console.log('user disliked', row);
            resolve('user disliked', row)
        });
        connection.execSql(request)

    });
}
module.exports.DisLike =DisLike ;


//checklogindetail

function checklogindetail(payload){
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM dbo.Users WHERE (email = @email AND password= @password)"
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('password', TYPES.VarChar, payload.password)
    
        request.on('row', (columns) => {
            resolve(columns)

        });
        connection.execSql(request)
    })

}
module.exports.checklogindetail = checklogindetail;


//potential matches
function getmypotentialmatches(){
    var userid = '79c03cd2-2328-46ff-b1a6-74c3c49fa428';
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [vw_potentialmatches]`
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('userid', TYPES.VarChar, userid)
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}
module.exports.getmypotentialmatches = getmypotentialmatches;

//adminuserstas

function getadminuserstats(){
    var userid = '79c03cd2-2328-46ff-b1a6-74c3c49fa428';
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [vw_adminuserstatsdashboard]`
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        //request.addParameter('userid', TYPES.VarChar, userid)
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}
module.exports.getadminuserstats = getadminuserstats;








//matchess

const executeSQL = (context) => {
    var result = "";    
   
    // Create Connection object
    const connection = new Connection(config);

    // Create the command to be executed
    const request = new Request("SELECT * FROM [dbo].[Users]", (err) => {
        if (err) {
            context.log.error(err);            
            context.res.status = 500;
            context.res.body = "Error executing T-SQL command";
        } else {
            context.res = {
                body: result
            }   
        }
        context.done();
        context.log(res);
    });    
    

    // Handle 'connect' event
    connection.on('connect', err => {
        if (err) {
            context.log.error(err);              
            context.res.status = 500;
            context.res.body = "Error connecting to Azure SQL query";
            context.done();
        }
        else {
            // Connection succeeded so execute T-SQL stored procedure
            // if you want to executer ad-hoc T-SQL code, use connection.execSql instead
            connection.execSql(request);
        }
    });

    // Handle result set sent back from Azure SQL
    request.on('row', columns => {
        columns.forEach(column => {
            result += column.value;                
        });
    });

    // Connect
    connection.connect();
}
module.exports.getmymacthes = function (context) {
    

    executeSQL(context)

};

