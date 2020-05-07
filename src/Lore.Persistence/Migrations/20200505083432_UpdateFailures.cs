using Microsoft.EntityFrameworkCore.Migrations;

namespace Lore.Persistence.Migrations
{
    public partial class UpdateFailures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceFailure_Failure_FailureId",
                schema: "dbo",
                table: "DeviceFailure");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Failure",
                schema: "dbo",
                table: "Failure");

            migrationBuilder.RenameTable(
                name: "Failure",
                schema: "dbo",
                newName: "Failures",
                newSchema: "dbo");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                schema: "dbo",
                table: "Failures",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Failures",
                schema: "dbo",
                table: "Failures",
                column: "Id");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceFailure_Failures_FailureId",
                schema: "dbo",
                table: "DeviceFailure");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Failures",
                schema: "dbo",
                table: "Failures");

            migrationBuilder.RenameTable(
                name: "Failures",
                schema: "dbo",
                newName: "Failure",
                newSchema: "dbo");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                schema: "dbo",
                table: "Failure",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Failure",
                schema: "dbo",
                table: "Failure",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceFailure_Failure_FailureId",
                schema: "dbo",
                table: "DeviceFailure",
                column: "FailureId",
                principalSchema: "dbo",
                principalTable: "Failure",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
