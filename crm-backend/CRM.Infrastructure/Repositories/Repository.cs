using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using CRM.Application.Interfaces;
using CRM.Infrastructure.Data;
using CRM.Domain.Common;

namespace CRM.Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly CRMDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(CRMDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }

    public async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        // Set UpdatedAt if entity is BaseEntity
        if (entity is BaseEntity baseEntity)
        {
            baseEntity.UpdatedAt = DateTime.UtcNow;
        }
        
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        return entity != null;
    }
}
