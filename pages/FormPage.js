import React from 'react'
import {Input } from 'semantic-ui-react';
import Image from "next/image"
const Login = (props) => {

    const { 
        email, 
        setEmail,
         password, 
         setPassword,
        handleLogin, 
         handleSignup,
          hasAccount, 
         setHasAccount,
          emailError, 
        passwordError 
    } = props;


    return (
        <>
     
        <div className = 'login' >

            <div className="loginContainer" >

            <div>

            <label>Username</label>
                <input
                type="text" 
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
                 <label>First Name</label>
                <input
                type="text" 
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
                <p className="errorMsg">{emailError}</p>

                 
                <label>Last Name</label>
                <input
                type="text" 
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
                <p className="errorMsg">{emailError}</p>
                <label>Email</label>
                <input
                type="text" 
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
                <p className="errorMsg">{emailError}</p>
                </div>

                <div className="btnContainer">

                    {hasAccount ? (
                        <> 
                        <button onClick ={handleLogin}> Sign In</button>
                        <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span> </p>
                        </>
                    ) : ( 

                        <> 
                        <button onClick={handleSignup}>Sign Up</button>
                        <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount) }>Sign In</span> </p>
                        </>


                    )}
                
                </div>

                 </div>
                 
            </div>

</>
    )
}

export default Login;
