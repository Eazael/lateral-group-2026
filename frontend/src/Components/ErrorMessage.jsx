import { Button } from "react-bootstrap";

function ErrorMessage({error, setError}) {

    const deleteError = () => {
        setError(null);
    }

    if (error === null || error === undefined) {
        return (<></>)
    }

    const getErrorList = () => {
        if (error?.data?.errors === undefined) {
            return (<></>)
        }

        let result = "";
        for(let field in error.data.errors) {
            result += " " + error.data.errors[field][0]
        }
        return result
    }

    return (
        <div className="error-message">
            { error.message !== null
                ? (<span>{error.message}</span>)
                : (<></>)
            }
            { getErrorList()}
            <Button
                variant="danger"
                onClick={deleteError}
            >X</Button>
        </div>
    )

}

export default ErrorMessage;