(function () {
  const formLogin = document.querySelector(".form-login");
  const inputPass = document.querySelector(
    '.form-login input[type="password"]'
  );
  const inputEmail = document.querySelector('.form-login input[type="email"]');
  const alertaError = document.querySelector(".form-login .alerta-error");
  const alertaExito = document.querySelector(".form-login .alerta-exito");

  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegex = /^.{4,12}$/;

  const estadoValidacionCampos = {
    userEmail: false,
    userPassword: false,
  };

  document.addEventListener("DOMContentLoaded", () => {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      enviarFormulario();
    });

    inputEmail.addEventListener("input", () => {
      validarCampo(
        emailRegex,
        inputEmail,
        "El correo solo puede contener letras, números, puntos, guiones y guíon bajo."
      );
    });

    inputPass.addEventListener("input", () => {
      validarCampo(
        passwordRegex,
        inputPass,
        "La contraseña tiene que ser de 4 a 12 dígitos"
      );
    });
  });

  function validarCampo(regularExpresion, campo, mensaje) {
    const validarCampo = regularExpresion.test(campo.value);
    if (validarCampo) {
      eliminarAlerta(campo.parentElement.parentElement);
      estadoValidacionCampos[campo.name] = true;
      campo.parentElement.classList.remove("error");
      return;
    }
    estadoValidacionCampos[campo.name] = false;
    campo.parentElement.classList.add("error");
    mostrarAlerta(campo.parentElement.parentElement, mensaje);
  }

  function mostrarAlerta(referencia, mensaje) {
    eliminarAlerta(referencia);
    const alertaDiv = document.createElement("div");
    alertaDiv.classList.add("alerta");
    alertaDiv.textContent = mensaje;
    referencia.appendChild(alertaDiv);
  }

  function eliminarAlerta(referencia) {
    const alerta = referencia.querySelector(".alerta");

    if (alerta) alerta.remove();
  }

  async function enviarFormulario() {
    // Validar los campos antes de enviar
    if (
      estadoValidacionCampos.userEmail &&
      estadoValidacionCampos.userPassword
    ) {
      try {
        const datos = {
          userEmail: inputEmail.value,
          userPassword: inputPass.value,
        };

        const respuesta = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
          alertaExito.textContent = resultado.message;
          alertaExito.classList.add("alertaExito");
          alertaError.classList.remove("alertaError");

          console.log("Datos del usuario:", resultado);
        } else {
          alertaError.textContent =
            resultado.error || "Error al iniciar sesión";
          alertaError.classList.add("alertaError");
        }
      } catch (error) {
        console.error("Error al enviar datos:", error);
        alertaError.textContent = "Error en el servidor";
        alertaError.classList.add("alertaError");
      } finally {
        setTimeout(() => {
          alertaError.classList.remove("alertaError");
          alertaExito.classList.remove("alertaExito");
        }, 3000);
      }
    } else {
      alertaError.textContent = "Por favor, completa los campos correctamente";
      alertaError.classList.add("alertaError");
      setTimeout(() => alertaError.classList.remove("alertaError"), 3000);
    }
  }
})();
