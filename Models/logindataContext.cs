using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CoreAngular.Models
{
    public partial class logindataContext : DbContext
    {

        public logindataContext(DbContextOptions<logindataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<Login> Login { get; set; }
        public virtual DbSet<Token> Token { get; set; }
        public virtual DbSet<TodoList> TodoList { get; set; }
        public virtual DbSet<Message> Message { get; set; }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customers>(entity =>
            {
                entity.ToTable("customers");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Age).HasColumnName("age");
            });

            modelBuilder.Entity<Token>(entity =>
            {
                entity.ToTable("token");

                entity.HasKey(e => e.token_id);

                entity.Property(e => e.token_id)
                   .HasMaxLength(255)
                   .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false);

            });

            modelBuilder.Entity<TodoList>(entity =>
            {
                entity.ToTable("TodoList");

                entity.HasKey(e => e.Username);

                entity.Property(e => e.Username)
                   .HasMaxLength(255)
                   .IsUnicode(false);

                entity.Property(e => e.List)
                    .IsUnicode(false);

            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.ToTable("Message");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id);

                entity.Property(e => e.To)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.From)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Msg)
                    .IsUnicode(false);

            });

            modelBuilder.Entity<Login>(entity =>
            {
                entity.HasKey(e => e.Username);

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Pass)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PassHash)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserHash)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
