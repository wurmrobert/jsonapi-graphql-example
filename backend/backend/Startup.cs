using backend.Data;
using backend.GraphQl;
using backend.Models;
using GraphQL;
using GraphQL.Http;
using GraphQL.Types;
using JsonApiDotNetCore.Builders;
using JsonApiDotNetCore.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace backend {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {

            services.AddCors (option => {
                option.AddPolicy ("AllowAllOrigin",
                    policy => policy.AllowAnyHeader ().AllowAnyMethod ().AllowAnyOrigin ().AllowCredentials ());
            });

            var connectionString = Configuration["DbContextSettings:ConnectionString"];
            services.AddEntityFrameworkNpgsql ()
                .AddDbContext<MasterdataContext> (options => options.UseNpgsql (connectionString));

            // add jsonapi dotnet core
            services.AddJsonApi<MasterdataContext> (
                opt => opt.Namespace = "api/v1"
            );

            // add graphql  
            services.AddSingleton<IDependencyResolver> (s => new FuncDependencyResolver (type => s.GetRequiredService (type)));
            services.AddSingleton<IDocumentExecuter, DocumentExecuter> ();
            services.AddSingleton<IDocumentWriter, DocumentWriter> ();

            services.AddScoped<MasterdataQuery>();
            services.AddScoped<ISchema, MasterdataSchema>();

            services.AddScoped<CustomerType>();
			services.AddScoped<IMasterdataDataStore, MasterdataDataStore>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor> ();


            services.AddMvc ();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment ()) app.UseDeveloperExceptionPage ();

            app.UseCors ("AllowAllOrigin");
            app.UseJsonApi ();

            app.UseMiddleware<GraphQLMiddleware> (new GraphQLSettings {
                BuildUserContext = ctx => new GraphQLUserContext {
                    User = ctx.User
                }
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc ();
        }
    }
}