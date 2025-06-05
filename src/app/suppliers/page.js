"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table/Table";
export default function Suppliers() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

    return (
        <div className="flex h-screen">
            <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            <main className="flex-1 p-6 bg-gray-50 overflow-auto">
                <Table
                    title="Fornercedores"
                    data={[]} 




                />
            </main>
          
        </div>
    );
}
