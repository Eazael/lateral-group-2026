namespace backend.Dto
{
    public class SuccessResponse(string message)
    {
        public string Message { get; set; } = message;
    }
}
