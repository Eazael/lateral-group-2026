using backend.Database.Context;
using backend.Database.Entity;
using Microsoft.AspNetCore.Mvc;
using backend.Dto;
using System.Net;

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

app.Run();
