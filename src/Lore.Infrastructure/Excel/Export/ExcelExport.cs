using System.Collections.Generic;
using System.IO;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using Lore.Application.Common.Interfaces.Services;

namespace Lore.Infrastructure.Excel.Export
{
    public abstract class ExcelExport : IExcelExport
    {
        protected string sheetName;
        protected string fileName;
        protected List<string> headers;
        protected List<string> type;
        protected IWorkbook workbook;
        protected ISheet sheet;

        /// <summary>
        /// Common Code for the Export
        /// It creates Workbook, Sheet, Generate Header Cells and returns byte array
        /// </summary>
        /// <typeparam name="T">Generic Class Type</typeparam>
        /// <param name="exportData">Data to be exported</param>
        /// <param name="fileName">Export File Name</param>
        /// <param name="sheetName">First Sheet Name</param>
        /// <returns></returns>
        public byte[] Export<T>(
            List<T> exportData,
            string sheetName = "01")
        {
            this.sheetName = sheetName;

            #region Generation of Workbook, Sheet and General Configuration

            workbook = new XSSFWorkbook();
            sheet = workbook.CreateSheet(this.sheetName);

            var headerStyle = workbook.CreateCellStyle();
            var headerFont = workbook.CreateFont();
            headerFont.IsBold = true;
            headerFont.FontHeightInPoints = 10;
            headerStyle.SetFont(headerFont);
            #endregion

            WriteData(exportData);

            #region Generating Header Cells
            var header = sheet.CreateRow(0);
            for (var i = 0; i < headers.Count; i++)
            {
                var cell = header.CreateCell(i);
                cell.SetCellValue(headers[i]);
                cell.CellStyle = headerStyle;
                // It's heavy, it slows down your Excel if you have large data                
                //sheet.AutoSizeColumn(i);
            }
            #endregion

            #region Generating and byte array for Excel
            using var memoryStream = new MemoryStream();
            workbook.Write(memoryStream);

            return memoryStream.ToArray();
            #endregion
        }

        /// <summary>
        /// Generic Definition to handle all types of List
        /// Overrride this function to provide your own implementation
        /// </summary>
        /// <param name="exportData"></param>
        public abstract void WriteData<T>(List<T> exportData);
    }
}
