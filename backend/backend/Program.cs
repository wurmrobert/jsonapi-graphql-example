using System;
using backend.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;

// ReSharper disable ClassNeverInstantiated.Global
// ReSharper disable MemberCanBePrivate.Global

namespace backend {
    public class Program {
        public static void Main (string[] args) {
            var host = BuildWebHost (args);

            using (var scope = host.Services.CreateScope ()) {
                var services = scope.ServiceProvider;
                try {
                    var context = services.GetRequiredService<MasterdataContext> ();
                    DbInitializer.Initialize (context);
                } catch (Exception ex) {
                    var logger = services.GetRequiredService<ILogger<Program>> ();
                    logger.LogError (ex, "An error occurred while seeding the database.");
                }
            }

            host.Run ();
        }

        public static IWebHost BuildWebHost (string[] args) {
            var directory = Directory.GetCurrentDirectory();

            var host = WebHost.CreateDefaultBuilder(args)
                .UseKestrel()
                .UseContentRoot(directory)
                .UseWebRoot(Path.Combine(directory, "wwwRoot"))
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

                return host;
        }
    }
}