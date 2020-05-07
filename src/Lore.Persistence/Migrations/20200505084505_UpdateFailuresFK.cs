using Microsoft.EntityFrameworkCore.Migrations;

namespace Lore.Persistence.Migrations
{
    public partial class UpdateFailuresFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceFailure_Failures_FailureId",
                schema: "dbo",
                table: "DeviceFailure");

            migrationBuilder.AlterColumn<long>(
                name: "FailureId",
                schema: "dbo",
                table: "DeviceFailure",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceFailure_Failures_FailureId",
                schema: "dbo",
                table: "DeviceFailure",
                column: "FailureId",
                principalSchema: "dbo",
                principalTable: "Failures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceFailure_Failures_FailureId",
                schema: "dbo",
                table: "DeviceFailure");

            migrationBuilder.AlterColumn<long>(
                name: "FailureId",
                schema: "dbo",
                table: "DeviceFailure",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceFailure_Failures_FailureId",
                schema: "dbo",
                table: "DeviceFailure",
                column: "FailureId",
                principalSchema: "dbo",
                principalTable: "Failures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
