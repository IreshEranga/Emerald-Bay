import jsPDF from "jspdf";
import "jspdf-autotable";
import { successMessage } from "./Alert";
/**
 * Generate PDF
 * @param {string} title
 * @param {array} columns
 * @param {array} data
 * @param {string} fileName
 * @returns {void}
 * @example
 * generatePDF("My Report", ["name", "age"], [{name: "John", age: 20}], "my-report");
 */
export function generatePDF(title, columns, data, fileName) {
  const doc = new jsPDF();
  const tableRows = [];

  data.forEach((item) => {
    const rowData = [];
    columns.forEach((column) => {
      rowData.push(item[column]);
    });
    tableRows.push(rowData);
  });

  doc.autoTable({
    columns: columns.map((c) => {
      return { title: c.toUpperCase(), dataKey: c };
    }),
    body: tableRows,
    margin: { top: 35 },
    didDrawPage: function (data) {
      doc.text(title, 20, 30);
    },
  });
  doc.save(fileName + ".pdf");
  successMessage("Success", "Your Report has been downloaded");
}
