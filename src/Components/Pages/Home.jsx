import img1 from '../../assets/punch-card.jpg'

const Home = () => {
    return (
        <div>
             


            <div className="hero min-h-screen" style={{ backgroundImage: `url(${img1})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg max-h-screen">
                        <h1 className="mb-5 text-5xl font-bold">Make Your Place Smarter</h1>
                        <p className="mb-5">Punch our card to automatically assign your attendance</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;