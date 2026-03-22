using backend.Database.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<TaskContext>();
builder.Services.AddValidation();

var app = builder.Build();

app.MapGet("/tasks", async (TaskContext taskContext) => 
{
    try
    {
        var tasks = taskContext.Tasks.OrderBy(task => task.Id).ToList();
        return Results.Ok(tasks);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.Run();
