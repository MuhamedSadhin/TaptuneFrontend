"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EnquiriesTable({
  data = [],
  total = 0,
  loading = false,
}) {
  return (
    (
      <div className="w-full">
        {/* Desktop Table */}
        <div className=" overflow-x-auto rounded-2xl shadow-sm border bg-white">
          <Table className="min-w-full">
            <TableCaption className="text-sm text-gray-500 p-4">
              Recent enquiries 
            </TableCaption>

            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-16 text-center px-4 py-3">#</TableHead>
                <TableHead className="min-w-[120px] px-4 py-3">Name</TableHead>
                <TableHead className="min-w-[180px] px-4 py-3">Email</TableHead>
                <TableHead className="min-w-[120px] px-4 py-3">Phone</TableHead>
                <TableHead className="min-w-[200px] px-4 py-3">
                  Message
                </TableHead>
                <TableHead className="min-w-[120px] px-4 py-3">
                  Created At
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((enquiry, index) => (
                  <TableRow
                    key={enquiry._id}
                    className="hover:bg-gray-50 transition-colors border-b"
                  >
                    <TableCell className="text-center px-4 py-4 text-sm">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium px-4 py-4">
                      {enquiry.name}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-sm">
                      {enquiry.email || "—"}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-sm">
                      {enquiry.phoneNumber || "—"}
                    </TableCell>
                    <TableCell className="px-4 py-4 max-w-[250px]">
                      <div
                        className="text-sm break-words whitespace-pre-line"
                        title={enquiry.message}
                      >
                        {enquiry.message || "—"}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-sm">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No enquiries found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-right font-medium px-4 py-3"
                >
                  Total enquiries: {total}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* Mobile Cards */}
        {/* <div className="md:hidden space-y-4">
          <div className="text-center text-sm text-gray-500 mb-4">
            Recent enquiries 
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg border">
              Loading...
            </div>
          ) : data.length > 0 ? (
            data.map((enquiry, index) => (
              <div
                key={enquiry._id}
                className="bg-white rounded-lg shadow-sm border p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="font-medium text-lg">#{index + 1}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Name:
                    </span>
                    <div className="text-sm mt-1">{enquiry.name}</div>
                  </div>

                  {enquiry.email && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Email:
                      </span>
                      <div className="text-sm mt-1 break-all">
                        {enquiry.email}
                      </div>
                    </div>
                  )}

                  {enquiry.phoneNumber && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Phone:
                      </span>
                      <div className="text-sm mt-1">{enquiry.phoneNumber}</div>
                    </div>
                  )}

                  {enquiry.message && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Message:
                      </span>
                      <div className="text-sm mt-1 leading-relaxed">
                        {enquiry.message}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg border">
              No enquiries found
            </div>
          )}

          <div className="text-center text-sm font-medium text-gray-600 bg-white rounded-lg border p-3">
            Total enquiries: {total}
          </div>
        </div> */}
      </div>
    )
  );
}
