import { useNavigate } from "react-router-dom";
import { Header } from "../components/global/header";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <main className="main ">
        <div className="flex h-[90vh] justify-center items-center flex-col ">
          <img
            src="https://www.electio.ir/wp-content/uploads/2022/05/0ec0dbf1e9a008acb9955d3246970e15.gif"
            alt="Imagem de erro"
            className="w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]  "
          />
          <div className="border-b-black flex justify-center flex-col">
            <strong className="text-7xl flex justify-center lg:text-8xl text-gray-800">
              OOPS
            </strong>
            <p className="text-center text-2xl mt-12">Página não encontrada!</p>
            <div className="flex justify-center items-center">
              <button
                onClick={() => navigate(-1)}
                className="text-white text-sm border-black border-spacing-4 shadow-lg rounded-2xl bg-indigo-950 w-40 h-10 hover:bg-indigo-700 hover:transition-all duration-500 ease-in-out hover:duration-200 hover:ease-in-out hover:w-44 mt-11 hover:mt-12 hover:shadow-2xl hover:rounded-3xl"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

