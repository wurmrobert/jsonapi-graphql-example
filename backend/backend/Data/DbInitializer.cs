using System;
using System.Collections.Generic;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using RandomNameGeneratorLibrary;

namespace backend.Data {
    public class DbInitializer {
        
        public static void Initialize(MasterdataContext context) {
            context.Database.EnsureCreated();
            
            CreateSampleData(context);
        }

        private static void CreateSampleData(MasterdataContext context) {
            context.Database.ExecuteSqlCommand("DELETE FROM \"public\".\"Devices\"");            
            context.Database.ExecuteSqlCommand("DELETE FROM \"public\".\"Customers\"");
            
            CreateCustomers(context);

            context.SaveChanges();
        }

        private static Customer[] CreateCustomers(MasterdataContext context) {
            var customers = new List<Customer> {
                new Customer {FirstName = "Robert", LastName = "Wurm"},
                new Customer {FirstName = "Carina", LastName = "Leitner"}
            };

            // var personGenerator = new PersonNameGenerator();
            // for (int i = 0; i < 10000; i++) {
            //     var c = new Customer();
            //     c.FirstName = personGenerator.GenerateRandomFirstName();
            //     c.LastName = personGenerator.GenerateRandomLastName();
            //     customers.Add(c);
            // }

            var devices = CreateDevices(context);
            customers[0].Devices = new List<Device>();
            customers[0].Devices.Add(devices[0]);


            foreach (var c in customers) {
                context.Customers.Add(c);
            }

            return customers.ToArray();
        }

        private static Device[] CreateDevices(MasterdataContext context) {
            
            var devices = new[] {
                new Device { MacAddress = "e0286d305f68", ExternalIpAddress = "192.168.123.8", IsOnline = true, LastInformAt = new DateTime() },
                new Device { SerialNumber = "T1707GS074408", IsOnline = false }
            };
            foreach (var d in devices) {
                context.Devices.Add(d);
            }

            return devices;
        }
    }
}