import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generatePDFReport = ({
  title,
  reportData,
  disclaimer,
  filename,
}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(14);
  doc.text(title, pageWidth / 2, 20, null, null, "center");

  doc.setFontSize(12);
  doc.text(
    `This report provides a detailed analysis of the factors influencing the ${title.toLowerCase()}.`,
    pageWidth / 2,
    30,
    null,
    null,
    "center"
  );

  doc.autoTable({
    startY: 40,
    head: [["Factor", "Value"]],
    body: Object.entries(reportData).map(([key, value]) => [key, value]),
    styles: {
      halign: "left",
      valign: "middle",
      fontSize: 10,
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: "auto" },
    },
    theme: "striped",
    margin: { top: 10, left: 10, right: 10 },
    tableWidth: pageWidth - 20,
  });

  const maxWidth = pageWidth - 20;
  doc.text(disclaimer, 10, doc.autoTable.previous.finalY + 20, { maxWidth });

  doc.save(`${filename}.pdf`);
};
