import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

import FormInput from "../components/FormInput";

import { useAuth } from "../context/AuthContext";

 

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

 

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

 

  const [errorMessage, setErrorMessage] = useState("");

 

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();

 

    const success = login(email, password);

 

    if (!success) {

      setErrorMessage("Neispravan e-mail ili lozinka.");

      return;

    }

 

    navigate("/");

  }

 

  return (

    <main className="auth-page">

      <section className="auth-card">

        <div className="auth-logo-circle">

          <span>BG</span>

        </div>

 

        <form className="auth-form" onSubmit={handleSubmit}>

          <FormInput

            id="login-email"

            type="email"

            placeholder="Unesite e-mail"

            value={email}

            onChange={(event) => setEmail(event.target.value)}

            required

          />

 

          <FormInput

            id="login-password"

            type="password"

            placeholder="Unesite lozinku"

            value={password}

            onChange={(event) => setPassword(event.target.value)}

            required

          />

 

          {errorMessage && <p className="form-error">{errorMessage}</p>}

 

          <Button type="submit" fullWidth>

            Prijavi se

          </Button>

 

          <Button

            type="button"

            variant="secondary"

            fullWidth

            onClick={() => navigate("/register")}

          >

            Registruj se

          </Button>

        </form>

      </section>

    </main>

  );

}

 

export default LoginPage;