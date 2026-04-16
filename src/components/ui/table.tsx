import { useState } from "react";
const dataHeader = [
  { name: "Name", key: "col1" },
  { name: "Email", key: "col2" },
  { name: "Date", key: "col3" },
  { name: "Response Time", key: "col4" },
];

const bodyData = [
  {
    id: 1,
    name: "Taslim Yusuf",
    email: "taslim.yusuf@example.com",
    date: "2023-01-01",
    responseTime: "4ms",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    date: "2023-01-02",
    responseTime: "6ms",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2023-01-03",
    responseTime: "5ms",
  },
  {
    id: 4,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    date: "2023-01-04",
    responseTime: "7ms",
  },
  {
    id: 5,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    date: "2023-01-05",
    responseTime: "4ms",
  },
  {
    id: 6,
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    date: "2023-01-06",
    responseTime: "6ms",
  },
  {
    id: 7,
    name: "David Davis",
    email: "david.davis@example.com",
    date: "2023-01-07",
    responseTime: "5ms",
  },
  {
    id: 8,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    date: "2023-01-08",
    responseTime: "7ms",
  },
  {
    id: 9,
    name: "Frank Miller",
    email: "frank.miller@example.com",
    date: "2023-01-09",
    responseTime: "4ms",
  },
];

interface tableProps {
  onView?: (data: any) => void;
  onEdit?: (data: any) => void;
  onDelete?: (id: any) => void;
}


function Table({onView, onEdit, onDelete}: tableProps) {
  const [actions, setActions] = useState(false)
  const [activeRow, setActiveRow] = useState()
  // const [actionType, setActionType] = useState(false)
  const handleAction = (row:any) => {
      console.log("row:", row)
      setActions(true)
      setActiveRow(row);
  };
  return (
    <div className="w-full rounded-lg border border-gray-200 shadow-sm bg-white overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                S/N
              </th>
              {dataHeader.map((header) => (
                <th
                  key={header.key}
                  className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header.name}
                </th>
              ))}
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Map through bodyData to create table rows */}
            {bodyData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">
                  {rowIndex + 1}
                </td>
                {/* map through each key-value pair in the row object, excluding the 'id' key, to create table cells */}
                {Object.entries(row)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <td key={key} className="px-6 py-4 text-sm text-gray-600">
                      {value}
                    </td>
                    
                  ))}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="relative inline-block">
                      <button onClick={() => {handleAction(row); setActions(true)}} className="hover:text-black text-gray-500 cursor-pointer font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5.92A.96.96 0 1 0 12 4a.96.96 0 0 0 0 1.92m0 7.04a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92M12 20a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92"/></svg>
                      </button>

                      {/* Action popup */}
                      {actions && activeRow === row && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setActions(false)} 
                          ></div>
                          <div className="absolute right-0 top-full mt-1 z-50 w-40 rounded-lg border border-gray-200 bg-white shadow-lg py-1">
                            <button onClick={() => onView && onView(row)} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                              {/* View icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                              View
                            </button>
                            <button onClick={() => onEdit && onEdit(row)} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                              {/* Edit icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              Edit
                            </button>
                            <div className="my-1 border-t border-gray-100"></div>
                            <button onClick={() => onDelete && onDelete(rowIndex)} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                              {/* Delete icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
