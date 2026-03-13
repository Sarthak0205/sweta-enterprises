import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Features from "../sections/Features";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="pt-20">
                <Hero />
                <Features />
            </div>
        </>
    );
}