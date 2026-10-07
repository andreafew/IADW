import { useState } from "react";
import "./App.css";
import logo from "./logo.png";

function Inscripto(nombre, email, curso, nivel) {
  this.nombre = nombre;
  this.email = email;
  this.curso = curso;
  this.nivel = nivel;
}

Inscripto.prototype.describir = function () {
  
  return `${this.nombre} se anotó en ${this.curso} (nivel ${this.nivel})`;
};

const formularioInicial = {
  nombre: "",
  email: "",
  curso: "Desarrollo web",
  nivel: "inicial",
  acepta: false,
};

const emailValido = (email) => /\S+@\S+\.\S+/.test(email);

function App() {
  const [datos, setDatos] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [inscriptos, setInscriptos] = useState([]);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({ ...datos, [name]: type === "checkbox" ? checked : value });
  };

  const validar = () => {
    const nuevos = {};
    if (datos.nombre.trim().length < 3) nuevos.nombre = "Escribí al menos 3 letras.";
    if (!emailValido(datos.email)) nuevos.email = "Ingresá un email válido.";
    if (!datos.acepta) nuevos.acepta = "Tenés que aceptar los términos.";
    return nuevos;
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const persona = new Inscripto(datos.nombre, datos.email, datos.curso, datos.nivel);
    setInscriptos([...inscriptos, persona]);
    setDatos(formularioInicial);
  };

  return (
    <>
      <header>
        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#formulario">Formulario</a>
          <a href="#inscriptos">Inscriptos</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="inicio">
          <div>
            <h1>Inscripción al curso</h1>
          <p>Completá el formulario para inscribirte al curso que quieras.</p>
          </div>
          <img
            src={logo}
            alt="Logo UNPILAR"
            className="logo"
          />
        </section>

        <section id="formulario">
          <h2>Formulario</h2>
          <form onSubmit={enviar} noValidate>
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              value={datos.nombre}
              onChange={manejarCambio}
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={datos.email}
              onChange={manejarCambio}
            />
            {errores.email && <span className="error">{errores.email}</span>}

            <label htmlFor="curso">Curso</label>
            <select id="curso" name="curso" value={datos.curso} onChange={manejarCambio}>
              <option>Desarrollo web</option>
              <option>JavaScript</option>
              <option>React</option>
            </select>

            <fieldset>
              <legend>Nivel</legend>
              {["inicial", "intermedio", "avanzado"].map((n) => (
                <label key={n} className="radio">
                  <input
                    type="radio"
                    name="nivel"
                    value={n}
                    checked={datos.nivel === n}
                    onChange={manejarCambio}
                  />
                  {n}
                </label>
              ))}
            </fieldset>

            <label className="radio">
              <input
                type="checkbox"
                name="acepta"
                checked={datos.acepta}
                onChange={manejarCambio}
              />
              Acepto los términos y condiciones
            </label>
            {errores.acepta && <span className="error">{errores.acepta}</span>}

            <button type="submit">Enviar inscripción</button>
          </form>
        </section>

        <section id="inscriptos">
          <h2>Inscriptos ({inscriptos.length})</h2>
          {inscriptos.length === 0 && <p>Todavía no hay inscriptos.</p>}
          <div className="galeria">
            {inscriptos.map((p, i) => (
              <article className="tarjeta" key={i}>
                <h3>{p.nombre}</h3>
                <p>{p.describir()}</p>
                <p>{p.email}</p>
              </article>
            ))}
          </div>

          <p className="nota">
            Esta es una app realizada con <strong>React</strong>, <strong>HTML</strong>,{" "}
            <strong>CSS</strong> y <strong>JavaScript</strong>.
          </p>
        </section>
      </main>

      <footer>
        <p>Universidad Nacional de Pilar - Introducción al diseño web - Andrea Arroyo - 2026 {" "}</p>
      </footer>
    </>
  );
}

export default App;
