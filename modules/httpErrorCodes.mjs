// The point of this class is increasing readability and maintainability of the rest of the code. 
// It should be extended and refactored as needed.

class HttpCodes {
    static SuccessfulResponse = {
        Ok: 200
    }

    static ClientSideErrorResponse = {
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406
    }
}

export default HttpCodes;
