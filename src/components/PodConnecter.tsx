import React from 'react';
import { LoginButton } from '@solid/react';
import SolidAuth from 'solid-auth-client';

// import auth from 'solid-auth-client';
// async function getWebId() {
//   /* 1. Check if we've already got the user's WebID and access to their Pod: */
//   let session = await auth.currentSession();
//   if (session) {
//     return session.webId;
//   }

//   /* 2. User has not logged in; ask for their Identity Provider: */
//   // Implement `getIdentityProvider` to get a string with the user's Identity Provider (e.g.
//   // `https://inrupt.net` or `https://solid.community`) using a method of your choice.
//   const identityProvider = await getIdentityProvider();

//   /* 3. Initiate the login process - this will redirect the user to their Identity Provider: */
//   auth.login(identityProvider);
// }


// Mozilla API URLSearchParams
const suggestedWebId = (URLSearchParams && document.location.search)
  ? (new URLSearchParams(document.location.search)).get('webid')
  : null;

export const PodConnecter: React.FC = () => {
  const [chosenWebId, setWebId] = React.useState(suggestedWebId);
  console.log(`suggested: ${suggestedWebId}\n`,
    `chosen: ${chosenWebId}\n`, 
    `setWeb: ${setWebId}`)

  if (suggestedWebId) {
    const login = () => {
      if (!chosenWebId) {
        return;
      }

      SolidAuth.login(chosenWebId);
    }

    return (
      <form onSubmit={(event) => {event.preventDefault(); login(); }}>
        <div className="field">
          <div className="control">
            <label htmlFor="webid" className="label">Your WebID:</label>
            <input
              type="url"
              name="webid"
              id="webid"
              className="input is-large"
              value={chosenWebId || ''}
              onChange={(e) => { e.preventDefault(); setWebId(e.target.value); }}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input type="submit" className="button is-primary is-large" value="Connect"/>
          </div>
        </div>
      </form>
    );
  }

  return <>
    <LoginButton popup="popup.html" className="button is-large is-primary">Connect</LoginButton>
  </>;
}
