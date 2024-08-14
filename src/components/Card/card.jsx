import { Link } from "react-router-dom";

const cardData = [
    {
        image: "https://previews.123rf.com/images/siraphol/siraphol2012/siraphol201202238/161555253-paisagem-bonita-do-oceano-do-mar-com-árvore-de-coco-da-silhueta-no-por-do-sol-ou-no-nascer-do-sol.jpg",
        category: "Shoes",
        name: "Running Shoes",
        price: "$50",
        description: "Comfortable running shoes for all terrains."
    },
    {
        image: "https://example.com/image2.jpg",
        category: "Shoes",
        name: "Casual Shoes",
        price: "$40",
        description: "Stylish casual shoes for everyday wear."
    },
    {
        image: "https://example.com/image2.jpg",
        category: "Shoes",
        name: "Casual Shoes",
        price: "$40",
        description: "Stylish casual shoes for everyday wear."
    },
    {
        image: "https://example.com/image2.jpg",
        category: "Shoes",
        name: "Casual Shoes",
        price: "$40",
        description: "Stylish casual shoes for everyday wear."
    },
    {
        image: "https://example.com/image2.jpg",
        category: "Shoes",
        name: "Casual Shoes",
        price: "$40",
        description: "Stylish casual shoes for everyday wear."
    },
    {
        image: "https://example.com/image2.jpg",
        category: "Shoes",
        name: "Casual Shoes",
        price: "$40",
        description: "Stylish casual shoes for everyday wear."
    },
    {
        image: "https://example.com/image2.jpg",
        category: "Shoes",
        name: "Casual Shoes",
        price: "$40",
        description: "Stylish casual shoes for everyday wear."
    },
];

export const Card = () => {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {cardData.map((card, index) => (
                <div key={index} className="card bg-base-100 border border-black/20 shadow-2xl">
                    <figure className="px-4 pt-4">
                        <img src={card.image} alt={card.name} className="rounded-xl w-full h-48 object-cover" />
                    </figure>
                    <div className="card-body text-center p-4">
                        <h2 className="card-title text-xl font-bold">{card.name}</h2>
                        <p className="text-sm text-gray-600">{card.description}</p>
                        <p className="text-lg font-bold mt-2">{card.price}</p>
                        <div className="card-actions mt-4">
                           <Link to={"/details"}>
                           
                            <button className="btn btn-primary">Ver Detalhes</button>
                           </Link>
                           
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
