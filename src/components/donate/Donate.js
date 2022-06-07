import { Link } from "react-router-dom"

export const Donate = () => {

    return <div>
        <div>Donate Page</div>

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