import { ChartAreaInteractive } from "@/app/(back)/admin/dashboard/_components/chart-area-interactive"
import { DataTable } from "@/app/(back)/admin/dashboard/_components/data-table"
import data from "@/app/(back)/admin/dashboard/_components/data.json"
import { SectionCards } from "@/app/(back)/admin/dashboard/_components/section-cards"

export default function Dashboard() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </div>
  )
}