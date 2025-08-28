import { useEffect, useState } from "react";
import { useGetAllEnquiries } from "@/hooks/tanstackHooks/useEnquiries";
import EnquiriesTable from "@/components/adminComponents/EnquiryComp/EnquiryTable";

export default function EnquiriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data, isLoading } = useGetAllEnquiries({search: debouncedSearch});
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearch(search);
      }, 500);
      return () => clearTimeout(handler);
    }, [search]);
  return (
    <div className="space-y-4">
      <div className="flex justify-start md:justify-between items-center">
        <div className="">
          <h2 className="text-2xl font-bold">Enquiry</h2>
          <p className="text-sm text-muted-foreground">
            All Enquiries are displayed Here .
          </p>
        </div>
        <input
          type="text"
          placeholder="Search enquiries..."
          className="border rounded-lg px-4 py-2 w-full md:max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table (child) */}
      <EnquiriesTable data={data?.data} loading={isLoading} />
    </div>
  );
}
