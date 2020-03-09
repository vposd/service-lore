using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Text.RegularExpressions;

namespace Lore.Infrastructure.Excel.Export
{
    public class GenericExcelExport : ExcelExport
    {
        public GenericExcelExport()
        {
            headers = new List<string>();
            type = new List<string>();
        }

        public sealed override void WriteData<T>(List<T> exportData)
        {
            var properties = TypeDescriptor.GetProperties(typeof(T));
            var table = new DataTable();

            #region Reading property name to generate cell header
            foreach (PropertyDescriptor prop in properties)
            {
                var type = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;
                this.type.Add(type.Name);
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
                var name = Regex.Replace(prop.Name, "([A-Z])", " $1").Trim(); //space seperated name by caps for header
                headers.Add(name);
            }
            #endregion

            #region Generating Datatable from List
            foreach (var item in exportData)
            {
                var row = table.NewRow();
                foreach (PropertyDescriptor prop in properties)
                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
                table.Rows.Add(row);
            }

            #endregion

            #region Generating SheetRow based on datatype

            for (var i = 0; i < table.Rows.Count; i++)
            {
                #endregion

                #region Generating SheetRow based on datatype
                var sheetRow = sheet.CreateRow(i + 1);
                for (var j = 0; j < table.Columns.Count; j++)
                {
                    var row = sheetRow.CreateCell(j);
                    var cellvalue = Convert.ToString(table.Rows[i][j]);

                    if (string.IsNullOrWhiteSpace(cellvalue))
                    {
                        row.SetCellValue(string.Empty);
                    }
                    else if (type[j].ToLower() == "string")
                    {
                        row.SetCellValue(cellvalue);
                    }
                    else if (type[j].ToLower() == "int32")
                    {
                        row.SetCellValue(Convert.ToInt32(table.Rows[i][j]));
                    }
                    else if (type[j].ToLower() == "double")
                    {
                        row.SetCellValue(Convert.ToDouble(table.Rows[i][j]));
                    }
                    else if (type[j].ToLower() == "datetime")
                    {
                        row.SetCellValue(Convert.ToDateTime
                             (table.Rows[i][j]).ToString("dd/MM/yyyy hh:mm:ss"));
                    }
                    else
                    {
                        row.SetCellValue(string.Empty);
                    }
                }
            }
            #endregion
        }
    }
}
