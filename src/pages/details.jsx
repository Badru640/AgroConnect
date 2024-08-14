
import { Details } from "../components/details/details"

export const DetailsPage = () => {
    return (
        <div>
            <Details/>
        </div>
    )
}


export const Details = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center" style={{ backgroundImage: 'url("/details-back4.jpg")' }}>
            <h1 className="font-black text-black text-center mb-6 text-3xl md:text-4xl lg:text-5xl">
                Detalhes do Produto
            </h1>
            <div className="card lg:card-side bg-base-100 shadow-xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col lg:flex-row">
                <figure className="w-full lg:w-1/3 flex-shrink-0">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                        alt="Album"
                        className="w-full h-full object-cover"
                    />
                </figure>
                <div className="card-body flex-1 p-4">
                    <h2 className="card-title text-xl md:text-2xl lg:text-3xl">Alface</h2>
                    <p className="font-bold mt-2">Categoria: Salada sla</p>
                    <p className="font-bold mt-2">Descrição:</p>
                    <p className="font-normal mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div className="card-actions flex flex-col lg:flex-row lg:justify-between mt-4">
                        <p className="font-bold">Preço: <span className="font-normal">dosihvousdhvodshovsd</span></p>
                        <button className="btn btn-primary mt-2 lg:mt-0">Listen</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

