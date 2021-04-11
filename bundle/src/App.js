
import React from 'react';
import {
  AuthButton, LoggedIn, LoggedOut,
  Value, Image, List, Link, Label,
  Like,
} from '@solid/react';

export default function App() {
  return (
    <div>
      <header>
        <h1>Solid App</h1>
        <p><AuthButton popup="https://solidcommunity.net/.well-known/solid/login"/></p>
        <p>
          <Like object="https://github.com/solid/react-components">
            the Solid React components</Like>
        </p>
      </header>
      <main>
        <LoggedIn>
          <Image src="user.image" defaultSrc="profile.svg" className="profile"/>
          <p>Welcome back, <Value src="user.name"/>.</p>
          <h2>Friends</h2>
        </LoggedIn>
        <LoggedOut>
          <p>You are logged out.</p>
        </LoggedOut>
      </main>
      <footer>
        <p>
          Solid React demo app
          by <Label src="https://ruben.verborgh.org/profile/#me"/> {' '}
          (<Link href="[https://ruben.verborgh.org/profile/#me].homepage"/>)
        </p>
      </footer>
    </div>
  );
}
          //<List src="user.friends.firstName"/>

// import React, { useState, useEffect } from "react";
// import "regenerator-runtime/runtime";

// import { handleIncomingRedirect, login, logout, fetch, getDefaultSession } from '@inrupt/solid-client-authn-browser'
// import { getSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";
// const REDIRECT_URL = window.location;

// export default function App() {
//   const [webId, setWebId] = useState(getDefaultSession().info.webId);
//   const [issuer, setIssuer] = useState("https://broker.pod.inrupt.cos/");
//   const [resource, setResource] = useState(webId);
//   const [data, setData] = useState(null);

//   // The useEffect hook is executed on page load, and in particular when the user
//   // is redirected to the page after logging in the identity provider.
//   useEffect(() => {
//     // After redirect, the current URL contains login information.
//     handleIncomingRedirect({
//       restorePreviousSession: true,
//     }).then((info) => {
//       setWebId(info.webId);
//       setResource(webId);
//     });
//   }, [webId]);

//   const handleLogin = (e) => {
//     // The default behaviour of the button is to resubmit.
//     // This prevents the page from reloading.
//     e.preventDefault();
//     // Login will redirect the user away so that they can log in the OIDC issuer,
//     // and back to the provided redirect URL (which should be controlled by your app).
//     login({
//       redirectUrl: REDIRECT_URL,
//       oidcIssuer: issuer,
//       clientName: "Demo app",
//     });
//   };

//   const handleLogout = (e) => {
//     e.preventDefault();
//     logout();
//     // The following has no impact on the logout, it just resets the UI.
//     setWebId(undefined);
//     setData("");
//     setResource("");
//   };

//   const handleFetch = (e) => {
//     e.preventDefault();
//     fetch(resource)
//       .then((response) => response.text())
//       .then(setData);
//   };

//   return (
//     <div>
//       <main>
//         <h1>Sandbox app</h1>
//         <p>{webId ? `Logged in as ${webId}` : "Not logged in yet"}</p>
//         <div>
//           <form>
//             <input
//               type="text"
//               value={issuer}
//               onChange={(e) => {
//                 setIssuer(e.target.value);
//               }}
//             />
//             <button onClick={(e) => handleLogin(e)}>Log In</button>
//             <button onClick={(e) => handleLogout(e)}>Log Out</button>
//           </form>
//         </div>
//         <hr />
//         <div>
//           <input
//             type="text"
//             value={resource}
//             onChange={(e) => {
//               setResource(e.target.value);
//             }}
//           />
//           <button onClick={(e) => handleFetch(e)}>Fetch</button>
//         </div>
//         <pre>{data}</pre>
//       </main>
//     </div>
//   );
// }
