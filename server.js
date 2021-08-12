let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;

//Actualizar el cliente postgres...
let pool = new pg.Pool({

    user: 'postgres',
    database: 'postgres',
    password: 'ros2020',
    host: 'localhost',
    port: 5432,
    max: 10
}); 

/*
pool.connect((err, db, done) => {

    if(err){
        return console.log(err);
    }
    else{
        db.query('select * from admin', (err, table) =>{
            done();
            if(err) {
                return console.log(err)
            }
            else{
                console.log(table.rows[0].email) //Trae un solo valor
            }
        })
    }
})
*/

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

app.use(morgan('dev'));

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/api/get-login', function(request, response) {
    console.log("llegox2");
});

//app.listen(PORT, () => console.log('Listening on port' + PORT));
