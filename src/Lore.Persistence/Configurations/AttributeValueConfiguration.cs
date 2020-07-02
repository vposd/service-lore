using Lore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lore.Persistence.Configurations
{
    public class AttributeValueConfiguration : IEntityTypeConfiguration<AttributeValue>
    {
        public void Configure(EntityTypeBuilder<AttributeValue> builder)
        {
            builder.Property(e => e.Value)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.IsDefault)
                .IsRequired();
        }
    }
}
