using Lore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lore.Persistence.Configurations
{
    public class OrderStateConfiguration : IEntityTypeConfiguration<OrderState>
    {
        public void Configure(EntityTypeBuilder<OrderState> builder)
        {
            builder.HasData(new OrderState
            {
                Id = 1,
                Name = "Default",
                Color = "#ffffff",
                IsDefault = 1,
                SortOrder = 0
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
