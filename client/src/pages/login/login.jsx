import React from "react";
import "../login/login.css";

import { GlobalContext } from "../../context/globalContext";

function login() {
  const { message, handleSubmitLogin, isRegister } = React.useContext(GlobalContext);
  console.log(isRegister)
  const handleSubmitLogin2 = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado, preventDefault ejecutado");
  
    const form = e.target;
    const formData = new FormData(form);
  
    const datos = {
      nombre_usu: formData.get("nombre_usu"),
      contra_usu: formData.get("contra_usu"),
    };
  
    console.log("Datos del formulario:", datos);
  
    const url = "http://localhost:3000/api/usersLogin";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
  
      console.log("Respuesta del servidor:", response);
  
      if (!response.ok) {
        setIsRegister(false);
        throw new Error(
          "Hubo un problema al realizar la petición: " + response.status
        );
      }
  
      const data = await response.json();
      console.log("Respuesta recibida:", data);
  
      setMessage(data.message);
      setIsRegister(true);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  };

  return (
    <div className=" ppal-login w-full">
      <div className=""></div>
      <div className=" flex justify-center">
        <div className=" conten-ppal-login flex justify-center h-[80vh] m-8 items-center w-[90%] ">
          <div className=" conten-letf w-[50%] bg-[#CED4DA] rounded-l-2xl hidden lg:block  ">
            <div className=" w-full fondo-login h-[80vh] rounded-br-[60px] rounded-l-2xl">
              
            </div>
          </div>

          <div className=" conten-right w-[50%] bg-[#070502] rounded-r-2xl shadow-[80px]">
            <div className=" w-full bg-[#CED4DA] h-[80vh] rounded-tl-[60px] rounded-r-2xl">

              <section class=" ppal-form-log flex justify-center h-[80vh] text-black ">
                <div class="flex flex-col items-center justify-center w-[70%]">
                  <div class="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 text-black h-[65vh]  ">
                    <div class=" form-login p-6 space-y-4 md:space-y-6 sm:p-8 shadow-sm ">
                      <h1 class="text-xl font-bold leading-tight tracking-tight  pb-2">
                        Iniciar Sesión
                      </h1>
                      {isRegister ? <p>{message}</p> : null}
                      <form class="space-y-4 md:space-y-6" onSubmit={handleSubmitLogin2}>
                        <div>
                          <label
                            for="email"
                            class="block mb-1 text-sm font-medium text-black"
                          >
                            Nombre Usuario
                          </label>
                          <input
                            type="text"
                            name="nombre_usu"
                            id="email"
                            class="text-black sm:text-sm border-gray-500 block w-full p-1.5 border-b-2  focus:outline-none pl-0 "
                            placeholder="Nombre o correo electrónico*"
                            required=""
                          />
                        </div>
                        <div>
                          <label for="password" class="block mb-1 text-sm font-medium text-black">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            name="contra_usu"
                            id="password"
                            placeholder="••••••••*"
                            class="text-black sm:text-sm border-gray-500 block w-full p-1.5 border-b-2  focus:outline-none pl-0 "
                            required=""
                          />
                        </div>

                        <div class="flex justify-end">
                          
                          <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-600">
                           ¿Olvidaste tu contraseña?
                          </a>
                        </div>
                        <div className=" flex justify-center">
                          <button type="submit" class="w-[80%] text-white bg-[#171824] font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:shadow-2xl ">
                            Ingresar
                          </button>
                        </div>
                        <p class="text-sm font-light text-gray-600  flex justify-center">
                          ¿Aún no tienes cuenta?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <a href="/register" class="font-medium text-primary-600  dark:text-primary-300 hover:text-[#171824]">
                          Crea una cuenta
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
