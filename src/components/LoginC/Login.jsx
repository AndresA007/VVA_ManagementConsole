import React, { useState, useEffect } from "react";
import { Component } from 'react';
import { makeStyles, Button } from "@material-ui/core";

const perfil = 0;

export default function LoginControl(props){      

  function someMethod(c) {

   if(c.length  <= 6){
      props.handler(c); 
   }
  }

    const [datos, setDatos] = useState({
        email: '',
        password: ''

    })

    const handleInputChange = (event) => {
      console.log(event.target.value);
      setDatos({
        ...datos,
        [event.target.name] : event.target.value
      })
    }

    function handleButton(){

      const request = new Request('http://localhost:3000/api/get-login', {

        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(datos)
      });

      //xmlhttprequest()

      fetch(request)
        .then(function(response) {
          response.json()
            .then(function(datos) {
                console.log(datos.message)  //El resultado que devuelve de la consulta
                someMethod(datos.message)
            })
        })
        .catch(function(err) {
          console.log(err)
        }) 

    }

    
   
return(

  <div>
        <h1>Login</h1>

        <form>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Button //type="submit" 
              size="large" variant="contained" color="primary"
              value="Login" onClick={() => {
                handleButton()
              }}>
                Entrar
              </Button>
            
          </div>

        </form>

  </div>


   );

};
