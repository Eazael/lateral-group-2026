using backend.Database.Context;
using backend.Database.Entity;
using Microsoft.AspNetCore.Mvc;
using backend.Dto;

var builder = WebApplication.CreateBuilder(args);
var corsPolicyName = "AllowFrontEnd";

builder.Services.AddTransient<TaskContext>();
builder.Services.AddValidation();
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors(corsPolicyName);

app.MapGet("/tasks", async (TaskContext taskContext, bool? finished) => 
{
    try
    {
        var taskFilter = finished is null
            ? taskContext.Tasks
            : taskContext.Tasks.Where(task => task.Finished == finished);
        var tasks = taskFilter.OrderBy(task => task.Id).ToList();
        return Results.Ok(tasks);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/tasks", async ([FromBody] ProgrammedTask task, TaskContext taskContext, CancellationToken cancellationToken) =>
{
    try
    {

        await taskContext.Tasks.AddAsync(task, cancellationToken);
        var saved = await taskContext.SaveChangesAsync(cancellationToken);
        return saved == 1 
            ? Results.Ok(new ResponseMessage("The task was saved successfully"))
            : Results.Problem("The task could not be saved to the database.");
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPatch("/tasks/{id}", async (int id, [FromBody] UpdateTask updateData, TaskContext taskContext, CancellationToken cancellationToken) =>
{
    try
    {
        var taskToUpdate = await taskContext.Tasks.FindAsync(new object[] { id }, cancellationToken);
        if (taskToUpdate is null)
        {
            return Results.NotFound(new ResponseMessage($"A task with the id {id} was not found."));
        }
        taskToUpdate.Update(updateData);
        var updated = await taskContext.SaveChangesAsync(cancellationToken);
        return updated == 1
            ? Results.Ok(new ResponseMessage("The task was updated successfully"))
            : Results.Problem("The task could not be updated in the database.");
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapDelete("/tasks/{id}", async (int id, TaskContext taskContext, CancellationToken cancellationToken) =>
{
    try
    {
        var taskToDelete = await taskContext.Tasks.FindAsync(new object[] { id }, cancellationToken);
        if (taskToDelete is null)
        {
            return Results.NotFound(new ResponseMessage($"A task with the id {id} was not found."));
        }
        taskContext.Remove(taskToDelete);
        var deleted = await taskContext.SaveChangesAsync(cancellationToken);
        return deleted == 1
            ? Results.Ok(new ResponseMessage("The task was deleted successfully"))
            : Results.Problem("The task could not be deleted in the database.");
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.Run();
