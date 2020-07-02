using Lore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lore.Persistence.Configurations
{
    public class AttributeConfiguration : IEntityTypeConfiguration<Attribute>
    {
        public void Configure(EntityTypeBuilder<Attribute> builder)
        {
            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.Type)
                .IsRequired();
        }
    }
}
