class ErrorData {
    message = "";
    data = null;

    constructor(message, errorData) {
        this.message = message;
        this.data = errorData;
    }
}

export default ErrorData;