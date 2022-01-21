using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;


            var roles = new List<AppRole>{
                new AppRole{Name="Admin"},
                new AppRole{Name="Member"},
                new AppRole{Name="Moderator"}
            };
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }


            var adminUser = new AppUser { UserName = "admin" };
            await userManager.CreateAsync(adminUser, "password");
            await userManager.AddToRolesAsync(adminUser, new[] { "Admin", "Moderator" });


            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "password");
                await userManager.AddToRoleAsync(user, "Member");
            }


        }
    }
}