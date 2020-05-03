using Lore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lore.Persistence.Configurations
{
    public class OrderStatusConfiguration : IEntityTypeConfiguration<OrderStatus>
    {
        public void Configure(EntityTypeBuilder<OrderStatus> builder)
        {
            builder.HasData(new OrderStatus
            {
                Id = 1,
                Name = "Default",
                Color = "#ffffff",
                IsDefault = 1,
                SortOrder = 0
            });

            builder.HasData(new OrderStatus
            {
                Id = 2,
                Name = "Ready",
                Color = "#ffffff",
                IsDefault = 0,
                isFinal = 1,
                SortOrder = 999
            });

            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.Color)
                .IsRequired()
                .HasMaxLength(7);
        }
    }
}
