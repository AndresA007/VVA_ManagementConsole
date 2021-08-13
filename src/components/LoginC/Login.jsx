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

    // Create the styles for Material UI components for mobile
const materialUIMobileStyles = {
  label: {
    fontSize: "2.2rem"
  },
  inBTN: {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    margin: '2px', 
    transform: "translate(-50%, -10%)",
    padding: "0.3%",
    background: "rgb(100, 200, 255)"

  }
 
};

// Create the styles for Material UI components for desktop
const materialUIDesktopStyles = {
  label: {
    fontSize: "0.9rem"
  },
  inBTN: {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    margin: '2px', 
    transform: "translate(-50%, -10%)",
    padding: "0.3%",
    background: "rgb(100, 200, 255)"

  }
  
};

    const useStyles = makeStyles(theme => {
      if (props.isMobile) {
        return materialUIMobileStyles;
      }
      else {
        return materialUIDesktopStyles;
      }
    });

    const classes = useStyles();

    
return(

  <div>
       
      <div>
      

        <h1 style={{ position: 'absolute', top: '50%', left: '50%', color: '#FFFFFF', margin: '2px', transform: "translate(-50%, -400%)" }}  >Login</h1>

        <form >
          <div>
            <input
              style={{ position: 'absolute', padding: "0.3%", top: '50%', left: '50%', color: 'black', margin: '2px', transform: "translate(-50%, -300%)" }}
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
              style={{ position: 'absolute', padding: "0.3%", top: '50%', left: '50%', color: 'black', margin: '2px', transform: "translate(-50%, -150%)" }}  
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <Button //type="submit" 
              size="large" variant="contained" color="primary"
              classes={{label: classes.label, root: classes.inBTN}}
              value="Login" onClick={() => {
                handleButton()
              }}>
                Entrar
              </Button>
            
          </div>

        </form>
        
      </div>
  </div>


   );

};
