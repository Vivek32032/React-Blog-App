 import Hero from "./Hero"
 import { Link } from "react-router-dom"
 
 
 
 function Home(){
    return (
        <div className="mx-auto">
        <Hero />
        <div className="flex justify-center container py-7">
        <Link className="border p-10 py-3 mt-20 text-3xl bg-gray-400 text-white" to="/articles">Show Articles</Link>
        </div>
        </div>
    )
 }

 export default Home;