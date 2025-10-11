// This file uses top-level statements, typical for modern .NET Core applications.

// Create a builder to configure the host
var builder = WebApplication.CreateBuilder(args);

// Build the application instance
var app = builder.Build();

// Define a simple GET endpoint at the root path "/"
app.MapGet("/", () => 
{
    // A quick, modern HTML response using Raw String Literal (C# 11+)
    // NOTE: The HTML block is now flush left, aligning with the closing triple quotes.
    return Results.Content("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>.NET Dashboard</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a2e; color: #fff; text-align: center; padding-top: 100px; }
        .card { background-color: #2c3e50; padding: 40px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); border-left: 5px solid #00c4ff; }
        h1 { color: #00c4ff; margin-bottom: 20px; }
        .footer { margin-top: 25px; color: #a0a0a0; font-size: 0.9em; }
    </style>
</head>
<body>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <div class="dashboard">
        
        <div class="header">
            <h1><i class="fas fa-ship"></i> Containerization Dashboard</h1>
            <div class="status-badge">STATUS: Deployed Successfully</div>
        </div>

        <div class="content-grid">
            
            <!-- Component 1: Technology Card -->
            <div class="card">
                <h2><i class="fab fa-python"></i> Technology Stack</h2>
                <p>
                    <strong>Language:</strong> C#<br>
                    <strong>Framework:</strong> ASP.NET Core 8.0<br>
                    <strong>Container Runtime:</strong> mcr.microsoft.com/dotnet/aspnet:8.0
                </p>
            </div>
            
            <!-- Component 2: Environment Card -->
            <div class="card">
                <h2><i class="fas fa-server"></i> Environment Details</h2>
                <p>
                    <strong>Internal Port:</strong> 8080<br>
                    <strong>External Port:</strong> 8080 (Mapped)<br>
                    <strong>Running OS:</strong> Alpine Linux (Optimized)
                </p>
            </div>
            
            <!-- Component 3: Build & Author Info -->
            <div class="card">
                <h2><i class="fas fa-code-branch"></i> Project Origin</h2>
                <p>
                    This is a basic, multi-stage Docker build to achieve a minimal image size. The goal is portability.
                </p>
                <p style="margin-top: 15px;">
                    **Created By:** <span class="author-name">Moshrekul Islam</span>
                </p>
            </div>
        </div>

        <div class="footer">
            Source: github/mirakib/ASP.NET Static Frontend Application
        </div>
=======
=======
>>>>>>> Stashed changes
    <div class="card">
        <h1>Hello from .NET Core! 🚀</h1>
        <p>This minimal ASP.NET Core 8 application is running successfully inside a Docker container.</p>
        <div class="footer">Built using Multi-Stage Docker by Moshrekul Islam</div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </div>
</body>
</html>
""", "text/html");
});

// Run the application
app.Run();
