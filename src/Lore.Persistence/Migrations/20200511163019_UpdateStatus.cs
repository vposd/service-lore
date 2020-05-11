using Microsoft.EntityFrameworkCore.Migrations;

namespace Lore.Persistence.Migrations
{
    public partial class UpdateStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderStatusHistory_OrderStates_OrderStatusId",
                schema: "dbo",
                table: "OrderStatusHistory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderStates",
                schema: "dbo",
                table: "OrderStates");

            migrationBuilder.RenameTable(
                name: "OrderStates",
                schema: "dbo",
                newName: "OrderStatuses",
                newSchema: "dbo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderStatuses",
                schema: "dbo",
                table: "OrderStatuses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderStatusHistory_OrderStatuses_OrderStatusId",
                schema: "dbo",
                table: "OrderStatusHistory",
                column: "OrderStatusId",
                principalSchema: "dbo",
                principalTable: "OrderStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderStatusHistory_OrderStatuses_OrderStatusId",
                schema: "dbo",
                table: "OrderStatusHistory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderStatuses",
                schema: "dbo",
                table: "OrderStatuses");

            migrationBuilder.RenameTable(
                name: "OrderStatuses",
                schema: "dbo",
                newName: "OrderStates",
                newSchema: "dbo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderStates",
                schema: "dbo",
                table: "OrderStates",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderStatusHistory_OrderStates_OrderStatusId",
                schema: "dbo",
                table: "OrderStatusHistory",
                column: "OrderStatusId",
                principalSchema: "dbo",
                principalTable: "OrderStates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
