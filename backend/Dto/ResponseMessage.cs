namespace backend.Dto
{
    public class ResponseMessage(string message)
    {
        public string Message { get; set; } = message;
    }
}
