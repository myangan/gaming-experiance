import "../Style/SignUp.css";
import React from "react";

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const handleSubmit = (event) => {
    console.log(`
      Email: ${email}
      Password: ${password}
      Accepted Terms: ${acceptedTerms}
    `);

    event.preventDefault();
  };
  return (
    <div class="SignUpForm">
      <form
        class="modal-content animate"
        action="/action_page.php"
        onSubmit={handleSubmit}
      >
        <div class="container">
          <h1>Create Account</h1>

          <label className="SignUpLabel">
            Email:
            <input
              className="SignUpInput"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="SignUpLabel">
            Password:
            <input
              className="SignUpInput"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label className="SignUpLabel">
            <input
              className="SignUpInput"
              name="acceptedTerms"
              type="checkbox"
              onChange={(e) => setAcceptedTerms(e.target.value)}
              required
            />
            I accept the terms of service
          </label>

          <button className="SignUpBtn">Submit</button>
        </div>
      </form>
    </div>
  );
}
// {
//   /* //  <div class="container">
// //         <h1>Sign Up</h1>
// //         <p>Please fill in this form to create an account.</p>
// //         <div class="clearFix">
// //           <button type="button" onclick={() => {}} class="cancelSignUp">
// //             Cancel
// //           </button>
// //           <button type="submit" onClick={() => {}} class="signUpButton">
// //             Sign Up
// //           </button>
// //         </div>
// //       </div> */
// }
