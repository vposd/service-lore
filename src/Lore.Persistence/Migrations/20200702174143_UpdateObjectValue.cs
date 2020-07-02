using Microsoft.EntityFrameworkCore.Migrations;

namespace Lore.Persistence.Migrations
{
    public partial class UpdateObjectValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ObjectAttributeValues_Orders_OrderId",
                schema: "dbo",
                table: "ObjectAttributeValues");

            migrationBuilder.AlterColumn<long>(
                name: "OrderId",
                schema: "dbo",
                table: "ObjectAttributeValues",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_ObjectAttributeValues_Orders_OrderId",
                schema: "dbo",
                table: "ObjectAttributeValues",
                column: "OrderId",
                principalSchema: "dbo",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ObjectAttributeValues_Orders_OrderId",
                schema: "dbo",
                table: "ObjectAttributeValues");

            migrationBuilder.AlterColumn<long>(
                name: "OrderId",
                schema: "dbo",
                table: "ObjectAttributeValues",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ObjectAttributeValues_Orders_OrderId",
                schema: "dbo",
                table: "ObjectAttributeValues",
                column: "OrderId",
                principalSchema: "dbo",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
