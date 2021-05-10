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
