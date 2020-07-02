using Lore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lore.Persistence.Configurations
{
    public class FailureConfiguration : IEntityTypeConfiguration<Failure>
    {
        public void Configure(EntityTypeBuilder<Failure> builder)
        {
            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
