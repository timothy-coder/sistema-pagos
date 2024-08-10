import XLSX from 'xlsx';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;

  // Ruta del archivo Excel
  const filePath = path.resolve('./src/data/data-pagos_old.xlsx');

  // Leer el archivo Excel
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convertir los datos a JSON
  const data = XLSX.utils.sheet_to_json(sheet);

  console.log("Datos cargados desde el Excel:", data); // Imprimir los datos cargados

  // Buscar el registro por DOCUMENTO
  const record = data.find(record => record.DOCUMENTO === id);

  if (record) {
    res.status(200).json(record);
  } else {
    res.status(404).json({ message: 'Registro no encontrado' });
  }
}
