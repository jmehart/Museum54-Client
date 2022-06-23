import { Link } from "react-router-dom"

export const Home = () => {
    return <div>
        <br></br>
        <h1 className="title has-text-centered is-family-primary is-size-1">Museum54</h1>
        <br></br>
        <div className="buttons is-centered">
            <Link to={`/donate/art`}>
                <div className="button is-primary is-large">Add Art</div>
            </Link>
        </div>
    </div>
}