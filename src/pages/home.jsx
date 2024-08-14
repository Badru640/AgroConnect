import { Card } from "../components/Card/card"
import { Header } from "../components/global/header"

export const Home = () => {
    return (

        <div data-theme="light">
            <Header/>

            <h1 className=" text-black">Ola Mundo</h1>
            <button className="btn btn-active btn-primary">Primary</button>
            <Card/>
        </div>
        
    )
}