using WeddingPlanner.Models;
using WeddingPlanner.Models.Enums;

namespace WeddingPlanner.Services
{
    public class DistributionService
    {
        public DistributionResult Calculate(DistributionRequest request)
        {
            if (!request.Validate())
                throw new ArgumentException("Request inválido");

            var result = new DistributionResult
            {
                TotalBudget = request.TotalBudget
            };

            var activeServices = request.Services
                .Where(s => !request.ExcludedServices.Contains(s.Name))
                .ToList();

            decimal fixedCosts = 0;

            foreach (var service in activeServices.Where(s => s.Type != ServiceType.Weighted))
            {
                var cost = service.CalculateCost(request.TotalBudget, request.GuestsCount);

                result.Services.Add(new ServiceDistribution
                {
                    Name = service.Name,
                    Cost = Math.Round(cost, 2),
                    Type = service.Type
                });

                fixedCosts += cost;
            }

            var remainingBudget = request.TotalBudget - fixedCosts;

            if (remainingBudget < 0)
                throw new InvalidOperationException("Os custos fixos já ultrapassam o orçamento.");

            var weightedServices = activeServices
                .Where(s => s.Type == ServiceType.Weighted)
                .ToList();

            var totalWeight = weightedServices.Sum(s => s.Weight);

            foreach (var service in weightedServices)
            {
                decimal cost = totalWeight == 0
                    ? 0
                    : (service.Weight / totalWeight) * remainingBudget;

                result.Services.Add(new ServiceDistribution
                {
                    Name = service.Name,
                    Cost = Math.Round(cost, 2),
                    Type = service.Type
                });
            }

            result.CalculateTotals();

            return result;
        }
    }
}