import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="error">
            <h1>404</h1>
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <Link to='/'>Landing Page</Link>
        
        </div>
    )
}

export default ErrorPage