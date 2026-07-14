const Table = ({ data, columns, onRowClick }) => { 
    return (
        <div className="overflow-x-auto w-full rounded-xl shadow-md overflow-hidden bg-white  ">
        <table>
            <thead className="bg-[#DDF4EF] text-[#6C798B] font-bold text-[10px] uppercase text-left tracking-[0.5px] leading-none"> 
                <tr className="even:bg-gray-50 hover:bg-[#DDF4EF]">
                    {columns.map((column) => (
                        <th className="px-4 py-3" key={column.key}>
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-left ">
                {data.map((row) => (
                    <tr className="hover:bg-gray-50" key={row.id} onClick={() => onRowClick(row)}>
                        {columns.map((column) => (
                            <td 
                                className="px-4 py-3" 
                                key={column.key}
                                onClick={(column.key === 'select' || column.key === 'actions') ? (e) => e.stopPropagation() : undefined}
                            >
                                {column.render ? column.render(row) : row[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
 }
 export default Table;