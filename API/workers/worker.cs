using System;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.workers
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public Worker(ILogger<Worker> logger, IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                // var users = await _uowService.UserRepository.GetUsersAsync();
                // foreach (var item in users)
                // {
                //     item.Created = DateTime.Now;
                // }
                // await _uowService.Complete();
               using (var scope = _serviceScopeFactory.CreateScope())
        {
            var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
            var users = await dataContext.Users.ToListAsync();
            foreach (var item in users)
            {
                item.Created =DateTime.Now;
            }
            await dataContext.SaveChangesAsync();
        }

                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                await Task.Delay(1000, stoppingToken);
            }
        }

        private void PerformCleanup()
    {
        using var scope = _serviceScopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<DataContext>();
        
    }
    }
}