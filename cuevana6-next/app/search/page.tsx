import { createClient } from "@/utils/supabase/server"
import SeriesCard from "@/components/SeriesCard";
import Header from "@/components/Header";

export default async function Page({ searchParams }: { searchParams: { streaming_service: string, rating: number } }) {
  const supabase = createClient()
  const { streaming_service, rating } = searchParams

  console.log(streaming_service, rating)

  const { data: series } = await supabase
    .from("series")
    .select()
    .eq("streaming_service", streaming_service)

  if (!series) {
    return <div>Series not found</div>
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Header />
      <div className="w-full md:px-32 justify-center items-center flex flex-col gap-4">
        <a href="/" className="btn btn-outline w-full">Results for {streaming_service || rating}</a>

        <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 lg:grid-cols-3">
          {series?.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      </div>
    </div>  
  )
}
