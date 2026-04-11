using WeddingPlanner.Models.Enums;

namespace WeddingPlanner.Models
{
    public class ServiceDistribution
    {
        public string Name { get; set; } = string.Empty;
        public decimal Cost { get; set; }
        public ServiceType Type { get; set; }
    }
}