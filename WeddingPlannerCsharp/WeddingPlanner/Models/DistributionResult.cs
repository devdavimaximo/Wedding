namespace WeddingPlanner.Models
{
    public class DistributionResult
    {
        public decimal TotalBudget { get; set; }
        public decimal TotalUsed { get; set; }
        public decimal RemainingAmount { get; set; }

        public List<ServiceDistribution> Services { get; set; } = new();

        public void CalculateTotals()
        {
            TotalUsed = Services.Sum(s => s.Cost);
            RemainingAmount = TotalBudget - TotalUsed;
        }
    }
}