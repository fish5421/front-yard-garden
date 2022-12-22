import React from 'react';
import { app } from "../firebase";
;import 'firebase/database';
import { getDatabase,ref,push,child,update} from "firebase/database";
import { Alert, Button } from "@material-tailwind/react";

// import { useFirebaseDatabase } from 'react-firebase-hooks/database';
import { useState, Fragment } from 'react';


function Newsletter() {

    // Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState(undefined);

  const validateForm = (message) => {
    // Check for empty strings in the form data
    if (message.trim().length !== 0) {
      console.log('input value is NOT empty');
      return true;
    } else {
      console.log('input value is empty');
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    let obj = {
      email: email,
    };
    if (validateForm(email)) {
      console.log('form is valid');
      // Submit the form data
      const newPostKey = push(child(ref(database), "email")).key;
      const updates = {};
      updates["/" + newPostKey] = obj;
      return update(ref(database), updates)
      .then(() => {
        setLoader(false);
        setStatus({ type: 'success' });
        setEmail("");
      })
      .catch((error) => {
        setStatus({ type: 'error', message: error.message });
        setLoader(false);
      });
    } else {
      // Display an error message or do something else to indicate that the form is invalid
      console.log(setStatus)
      setStatus({ type: 'error', message: 'Please fill out all fields.' });
    }
   
    
    // setLoader(true);
    // database.ref('emails').set({
    //   email: email,
    //   })
    // .then(() => {
    //   setLoader(false);
    //   alert('Your email has been submitted');
    // })
    // .catch((error) => {
    //   alert(error.message);
    //   setLoader(false);
    // });

    
  };

  return (
    <section id="section-cta">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* CTA box */}
          <div
            className="relative bg-gray-900 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden"
            data-aos="zoom-y-out"
          >
            {/* Background illustration */}
            <div
              className="absolute right-0 bottom-0 pointer-events-none hidden lg:block"
              aria-hidden="true"
            >
              <svg width="428" height="328" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient
                    cx="35.542%"
                    cy="34.553%"
                    fx="35.542%"
                    fy="34.553%"
                    r="96.031%"
                    id="ni-a"
                  >
                    <stop stopColor="#DFDFDF" offset="0%" />
                    <stop stopColor="#4C4C4C" offset="44.317%" />
                    <stop stopColor="#333" offset="100%" />
                  </radialGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g fill="#FFF">
                    <ellipse
                      fillOpacity=".04"
                      cx="185"
                      cy="15.576"
                      rx="16"
                      ry="15.576"
                    />
                    <ellipse
                      fillOpacity=".24"
                      cx="100"
                      cy="68.402"
                      rx="24"
                      ry="23.364"
                    />
                    <ellipse
                      fillOpacity=".12"
                      cx="29"
                      cy="251.231"
                      rx="29"
                      ry="28.231"
                    />
                    <ellipse
                      fillOpacity=".64"
                      cx="29"
                      cy="251.231"
                      rx="8"
                      ry="7.788"
                    />
                    <ellipse
                      fillOpacity=".12"
                      cx="342"
                      cy="31.303"
                      rx="8"
                      ry="7.788"
                    />
                    <ellipse
                      fillOpacity=".48"
                      cx="62"
                      cy="126.811"
                      rx="2"
                      ry="1.947"
                    />
                    <ellipse
                      fillOpacity=".12"
                      cx="78"
                      cy="7.072"
                      rx="2"
                      ry="1.947"
                    />
                    <ellipse
                      fillOpacity=".64"
                      cx="185"
                      cy="15.576"
                      rx="6"
                      ry="5.841"
                    />
                  </g>
                  <circle fill="url(#ni-a)" cx="276" cy="237" r="200" />
                </g>
              </svg>
            </div>

            <div className="relative flex flex-col lg:flex-row justify-between items-center">
              {/* CTA content */}
              <div className="text-center lg:text-left lg:max-w-xl">
                <h3 className="h3 text-white mb-2">Don't wait any longer</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Turn your front yard into a thriving garden. Contact us today
                  to learn more about our harvesting services and take the first
                  step towards a greener, healthier future.{" "}
                </p>

                {/* CTA form */}
                <form onSubmit={handleSubmit} className="w-full lg:w-auto">
                  <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:mx-0">
                    <input
                      type="email"
                      className="form-input w-full appearance-none bg-gray-800 border border-gray-700 focus:border-gray-600 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500"
                      placeholder="Your email…"
                      aria-label="Your email…"
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}
                    />
                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 shadow">
                      Subscribe
                    </button>
                  </div>
                  {status?.type === "success" && (
                      <Alert className = "mt-10" color="green">
                        We will reach out to you shortly.
                      </Alert>
                  )}
                  {status?.type === "error" &&  <Alert className = "mt-10" color="red">
                        An error occured. Please try again.
                      </Alert> }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
