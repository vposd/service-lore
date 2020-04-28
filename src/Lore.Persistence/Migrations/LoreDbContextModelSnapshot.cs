﻿// <auto-generated />
using System;
using Lore.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Lore.Persistence.Migrations
{
    [DbContext(typeof(LoreDbContext))]
    partial class LoreDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("dbo")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Lore.Domain.Entities.Attribute", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Attributes");
                });

            modelBuilder.Entity("Lore.Domain.Entities.AttributeValue", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long>("AttributeId")
                        .HasColumnType("bigint");

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDefault")
                        .HasColumnType("boolean");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("AttributeId");

                    b.ToTable("AttributesValues");
                });

            modelBuilder.Entity("Lore.Domain.Entities.Customer", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Lore.Domain.Entities.Device", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("Lore.Domain.Entities.Employee", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Phone")
                        .HasColumnType("character varying(24)")
                        .HasMaxLength(24);

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("Lore.Domain.Entities.Order", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<long>("CustomerId")
                        .HasColumnType("bigint");

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<long>("OrderDeviceId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("OrderDeviceId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Lore.Domain.Entities.OrderDevice", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<long>("DeviceId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.ToTable("OrderDevices");
                });

            modelBuilder.Entity("Lore.Domain.Entities.OrderDeviceAttribute", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long>("AttributeValueId")
                        .HasColumnType("bigint");

                    b.Property<long>("OrderDeviceId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("AttributeValueId");

                    b.HasIndex("OrderDeviceId");

                    b.ToTable("OrderDeviceAttribute");
                });

            modelBuilder.Entity("Lore.Domain.Entities.OrderItem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric");

                    b.Property<long>("OrderId")
                        .HasColumnType("bigint");

                    b.Property<long>("ProductId")
                        .HasColumnType("bigint");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("Lore.Domain.Entities.OrderState", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("character varying(7)")
                        .HasMaxLength(7);

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<int>("IsDefault")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.Property<int>("SortOrder")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("OrderStates");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Color = "#ffffff",
                            Deleted = 0,
                            IsDefault = 1,
                            Name = "Default",
                            SortOrder = 0
                        });
                });

            modelBuilder.Entity("Lore.Domain.Entities.OrderStateHistory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<long>("OrderId")
                        .HasColumnType("bigint");

                    b.Property<long>("OrderStateId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("OrderStateId");

                    b.ToTable("OrderStateHistory");
                });

            modelBuilder.Entity("Lore.Domain.Entities.Product", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<long>("GroupId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<long?>("ProductGroupId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ProductGroupId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Lore.Domain.Entities.ProductGroup", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Deleted")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasMaxLength(50);

                    b.Property<long>("ParentId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("ProductGroups");
                });

            modelBuilder.Entity("Lore.Domain.Entities.AttributeValue", b =>
                {
                    b.HasOne("Lore.Domain.Entities.Attribute", "Attribute")
                        .WithMany("Values")
                        .HasForeignKey("AttributeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Lore.Domain.Entities.Order", b =>
                {
                    b.HasOne("Lore.Domain.Entities.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lore.Domain.Entities.OrderDevice", "OrderDevice")
                        .WithMany()
                        .HasForeignKey("OrderDeviceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Lore.Domain.Entities.OrderDevice", b =>
                {
                    b.HasOne("Lore.Domain.Entities.Device", "Device")
                        .WithMany()
                        .HasForeignKey("DeviceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Lore.Domain.Entities.OrderDeviceAttribute", b =>
                {
                    b.HasOne("Lore.Domain.Entities.AttributeValue", "AttributeValue")
                        .WithMany()
                        .HasForeignKey("AttributeValueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lore.Domain.Entities.OrderDevice", "OrderDevice")
                        .WithMany("OrderDeviceAttributes")
                        .HasForeignKey("OrderDeviceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Lore.Domain.Entities.OrderItem", b =>
                {
                    b.HasOne("Lore.Domain.Entities.Order", "Order")
                        .WithMany("Items")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lore.Domain.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Lore.Domain.Entities.OrderStateHistory", b =>
                {
                    b.HasOne("Lore.Domain.Entities.Order", "Order")
                        .WithMany("StateHistory")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lore.Domain.Entities.OrderState", "OrderState")
                        .WithMany()
                        .HasForeignKey("OrderStateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Lore.Domain.Entities.Product", b =>
                {
                    b.HasOne("Lore.Domain.Entities.ProductGroup", "ProductGroup")
                        .WithMany()
                        .HasForeignKey("ProductGroupId");
                });
#pragma warning restore 612, 618
        }
    }
}
