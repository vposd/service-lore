namespace Lore.Application.Common.Interfaces
{
    public interface ILoreDbContextFactory
    {
        ILoreDbContext Create();
    }
}
