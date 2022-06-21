import { Link } from "react-router-dom"

export const Donate = () => {

    return <section className="donate-section">
        <br></br>
        <h2 className="title has-text-centered">Donate to Museum 54</h2>
        <br></br>
        
        <div className="buttons is-centered">
            <Link to={`/donate/artist`}>
                <div className="button is-success is-large">Add Artist</div>
            </Link>
        </div>
        <div className="buttons is-centered">
            <Link to={`/donate/art`}>
                <div className="button is-info is-large">Add Art</div>
            </Link>
        </div>



    </section >
}