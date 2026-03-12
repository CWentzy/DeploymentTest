using Microsoft.EntityFrameworkCore;

namespace TestApp.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            var app = builder.Build();

            //app.UseDefaultFiles();
            //app.MapStaticAssets();

            // Configure the HTTP request pipeline.

            //app.UseHttpsRedirection();

            //app.UseAuthorization();


            app.MapControllers();

            //app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
