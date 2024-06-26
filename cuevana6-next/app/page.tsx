import { createClient } from "@/utils/supabase/server"
import SeriesCard from "@/components/SeriesCard";
import Header from "@/components/Header";

export default async function Page() {
  const supabase = createClient()
  const { data: series } = await supabase.from("series").select()

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Header />
      <div className="w-full md:px-32 justify-center items-center flex flex-col gap-4">
        <a href="/series/create" className="btn btn-outline w-full">Add TV Series</a>

        <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 lg:grid-cols-3">
          {series?.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      </div>
    </div>  
  )
}
