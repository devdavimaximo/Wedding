using WeddingPlanner.Models.Enums;

namespace WeddingPlanner.Models
{
    public class ServiceItem
    {
        public string Name { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public decimal Weight { get; set; }
        public ServiceType Type { get; set; }
        public bool IsRequired { get; set; }

        public ServiceItem() { }

        public ServiceItem(string name, ServiceType type, decimal value, bool isRequired, decimal weight = 0)
        {
            Name = name;
            Type = type;
            Value = value;
            IsRequired = isRequired;
            Weight = weight;
        }

        public decimal CalculateCost(decimal totalBudget, int guestsCount)
        {
            if (!IsValid())
                throw new InvalidOperationException("Invalid service configuration");

            return Type switch
            {
                ServiceType.Fixed => Value,
                ServiceType.PerGuest => Value * guestsCount,
                ServiceType.Percentage => totalBudget * (Value / 100m),
                _ => 0
            };
        }

        public bool IsValid()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;

            if (Value < 0)
                return false;

            if (Type == ServiceType.Percentage && Value > 100)
                return false;

            if (Type == ServiceType.Weighted && Weight <= 0)
                return false;

            return true;
        }
    }
}