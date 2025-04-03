import CustomersTable from "./CustomersTable";

import axiosInstance from "@/lib/axiosInstance";

export default async function CustomersPage() {
  const Customers = await axiosInstance.get("api/customers/").then((res) => res.data)

  return (
    <div  className="p-6 max-w-[1400px] mx-auto space-y-6">   
     <h1 className="text-2xl font-bold ">Users Page</h1>
      <CustomersTable Customers={Customers} />
    </div>
  )

}