import "../Style/SignUp.css";

export default function SignUp() {
  return (
    <div class="SignUpForm">
      <form class="modal-content animate" action="/action_page.php">
        <div class="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <div class="clearFix">
            <button type="button" onclick={() => {}} class="cancelSignUp">
              Cancel
            </button>
            <button type="submit" onClick={() => {}} class="signUpButton">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
