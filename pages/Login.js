import React from 'react'
import {Input, Image, Button } from 'semantic-ui-react';

// import Image from "next/image"
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
        {/* <div style={{backgroundColor: 'black', textAlign: "center"}}>
        <Image layout="intrinsic" width="400" height="400"  src="/Gamer X Society Website Layout-4.png"/>
        <div style={{fontWeight: '700', fontSize: 25, color: 'white', textAlign: 'center', paddingBottom: 30}}>
            <p>Welcome to the future of gaming.</p>
        <br />
        <p>We enable gamers to earn real world rewards for playing video games. </p>
      <br /> 
      </div>

      <div style={{width: "60%", margin: 'auto', textAlign: 'center', paddingBottom: '20%', backgroundColor: "black"}}>
      <p style={{color: 'white'}}>Exclusive beta has closed. Please join the waiting list below.</p>
      <Input focus fluid placeholder="Enter your email"/>
      <br />
      <p style={{color: 'white'}}>We will notify you when the next beta is available for entry.</p>
      </div>
    
       
        </div>
        <div className = 'login' >
        <Image size="mini"  src="/Howitworks.png"  />

            <div className="loginContainer" >

            <div>
            <Button content="Hello" color="blue" size="massive" />
            <label>Username</label>
                <input
                type="text" 
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
                <p className="errorMsg">{emailError}</p>

                 <label>Password</label>
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 />
                 <p className="errorMsg">{passwordError}</p>
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

        </div> */}

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-64" src="/White_GamerXSociety_logo.png" alt="The Future Of Gaming " />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      
         <a href="#" class="font-medium text-gray-100 hover:text-gray-200">
           Beta closed.. Please sign up to be notified as when more spots open.
        </a>
    </div>
    <form class="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-gray-100 hover:text-gray-200">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            {/* <!-- Heroicon name: solid/lock-closed --> */}
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
</>
    )
}

export default Login;
