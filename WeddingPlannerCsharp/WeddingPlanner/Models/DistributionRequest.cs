namespace WeddingPlanner.Models
{
    public class DistributionRequest
    {
        public decimal TotalBudget { get; set; }
        public int GuestsCount { get; set; }
        public List<string> ExcludedServices { get; set; } = new();
        public List<ServiceItem> Services { get; set; } = new();

        public DistributionRequest() { }

        public DistributionRequest(decimal totalBudget, int guestsCount, List<ServiceItem> services, List<string> excludedServices)
        {
            TotalBudget = totalBudget;
            GuestsCount = guestsCount;
            Services = services ?? new();
            ExcludedServices = excludedServices ?? new();
        }

        public bool Validate()
        {
            if (TotalBudget <= 0)
                return false;

            if (GuestsCount <= 0)
                return false;

            if (Services.Count == 0)
                return false;

            if (Services.Any(s => !s.IsValid()))
                return false;

            if (ExcludedServices?.Any(string.IsNullOrWhiteSpace) == true)
                return false;

            return true;
        }
    }
}