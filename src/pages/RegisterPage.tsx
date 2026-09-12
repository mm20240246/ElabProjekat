import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

import FormInput from "../components/FormInput";

import { useAuth } from "../context/AuthContext";

 

function RegisterPage() {

  const navigate = useNavigate();

  const { register } = useAuth();

 

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmedPassword, setConfirmedPassword] = useState("");

 

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

 

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();

 

    setErrorMessage("");

    setSuccessMessage("");

 

    if (password !== confirmedPassword) {

      setErrorMessage("Lozinke se ne poklapaju.");

      return;

    }

 

    try {

      register(name, email, password);

      setSuccessMessage("Uspešno ste se registrovali. Prebacivanje na login...");

 

      setTimeout(() => {

        navigate("/login");

      }, 1000);

    } catch (error) {

      if (error instanceof Error) {

        setErrorMessage(error.message);

      } else {

        setErrorMessage("Došlo je do greške prilikom registracije.");

      }

    }

  }

 

  return (

    <main className="auth-page">

      <section className="auth-card auth-card--register">

        <div className="auth-logo-circle">

          <span>BG</span>

        </div>

 

        <form className="auth-form" onSubmit={handleSubmit}>

          <FormInput

            id="register-name"

            type="text"

            placeholder="Unesite ime"

            value={name}

            onChange={(event) => setName(event.target.value)}

            required

          />

 

          <FormInput

            id="register-email"

            type="email"

            placeholder="Unesite e-mail"

            value={email}

            onChange={(event) => setEmail(event.target.value)}

            required

          />

 

          <FormInput

            id="register-password"

            type="password"

            placeholder="Unesite lozinku"

            value={password}

            onChange={(event) => setPassword(event.target.value)}

            required

          />

 

          <FormInput

            id="register-confirm-password"

            type="password"

            placeholder="Potvrdite lozinku"

            value={confirmedPassword}

            onChange={(event) => setConfirmedPassword(event.target.value)}

            required

          />

 

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          {successMessage && <p className="form-success">{successMessage}</p>}

 

          <Button type="submit" fullWidth>

            Registruj se

          </Button>

 

          <Button

            type="button"

            variant="secondary"

            fullWidth

            onClick={() => navigate("/login")}

          >

            Nazad na prijavu

          </Button>

        </form>

      </section>

    </main>

  );

}

 

export default RegisterPage;