namespace backend.Dto
{
    public class UpdateTask(bool finished)
    {
        public bool Finished { get; set; } = finished;
    }
}
