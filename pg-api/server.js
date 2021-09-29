let express = require('express');
let cors = require('cors');
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

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

app.use(morgan('dev'));

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //Se pone cors(), para que permita el servicio en los navegadores
app.post('/api/get-login',cors(), function(request, response) {
    
    const email = request.body.email;
    const pass = request.body.password;

    console.log(email);
    console.log(pass);

    console.log("llegox2");

    pool.connect((err, db, done) => {

        if(err){
            //return console.log(err);
            //return response.status(400).send(err);
        }
        else{
            db.query('SELECT * FROM admin WHERE email= $1 and password= $2',[email, pass], (err, table) =>{
                done();
                if(err) {
                    //return console.log(err)
                    return response.status(400).send(err);
                }
                else{
                    //console.log(table.rows[0].email) //Trae un solo valor
                    //response.status(201).send({message: '2'}); //Mensaje que se va a enviar como respuesta
                    //db.end();
                    try{
                        if(email === table.rows[0].email){
                            console.log("Usuario registrado");
                            response.status(201).send({message: '2'}); //Mensaje que se va a enviar como respuesta
                        }
                    
                    }catch (error){
                        console.error("Usuario no registrado");
                        response.status(201).send({message: 'Usuario no registrado'});
                    }
                }
                
            })
        }
    })


});

app.listen(PORT, () => console.log('Listening on port' + PORT));
