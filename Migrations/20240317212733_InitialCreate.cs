using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TopHundredTrades.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    underlying_symbol = table.Column<string>(type: "TEXT", nullable: false),
                    quote_datetime = table.Column<string>(type: "TEXT", nullable: false),
                    exchange = table.Column<int>(type: "INTEGER", nullable: false),
                    trade_price = table.Column<float>(type: "REAL", nullable: false),
                    trade_size = table.Column<int>(type: "INTEGER", nullable: false),
                    trade_condition_id = table.Column<int>(type: "INTEGER", nullable: false),
                    canceled_trade_condition_id = table.Column<int>(type: "INTEGER", nullable: false),
                    bid = table.Column<float>(type: "REAL", nullable: false),
                    ask = table.Column<float>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trades", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Trades");
        }
    }
}
