import { Link } from "react-router-dom"

export const Donate = () => {

    return <div>
        <h2>Donate to Museum 54</h2>

        <div>
            <Link to={`/donate/artist`}>
                Add Artist
            </Link>
        </div>
        <div>
            <Link to={`/donate/art`}>
                Add Art
            </Link></div>


    </div>
}