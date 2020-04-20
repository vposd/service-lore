namespace Lore.Domain.Common
{
    public class DeletableEntity : Entity
    {
        public int Deleted { get; set; } = 0;
    }
}
