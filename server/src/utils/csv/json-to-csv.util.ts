interface CsvConvertible {
  [key: string]: any;
}

export const jsonToCsv = <T extends CsvConvertible>(
  data: T[],
): string => {
  if (data.length === 0) {
    return '';
  }

  const rows: string[] = [];
  const headers: string[] = Object.keys(data[0]);

  rows.push(headers.join(','));

  for (const item of data) {
    const row: string[] = [];

    for (const header of headers) {
      row.push(`"${`${(item[header] ?? '')}`.replace(/"/g, '""')}"`);
    }

    rows.push(row.join(','));
  }

  return rows.join('\n');
}
