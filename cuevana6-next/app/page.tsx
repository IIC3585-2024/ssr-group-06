import { createClient } from "@/utils/supabase/server"
import SeriesCard from "@/components/SeriesCard";
import Header from "@/components/Header";

const STREAMING_SERVICES = [
  { value: 'netflix', label: 'Netflix' },
  { value: 'max', label: 'MAX' },
  { value: 'amazon', label: 'Amazon Prime' },
  { value: 'disney', label: 'Disney+' },
  { value: 'hulu', label: 'Hulu' },
  { value: 'paramount', label: 'Paramount+' },
  { value: 'apple', label: 'Apple TV+' },
]

export default async function Page() {
  const supabase = createClient()
  const { data: series } = await supabase.from("series").select()

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Header />
      <div className="w-full md:px-32 justify-center items-center flex flex-col gap-4">
        <a href="/series/create" className="btn btn-outline w-full">Add TV Series</a>

        <form action="/search" method="get" className="w-full flex gap-4">
          <select name="streaming_service" className="select select-bordered w-full">
            <option value="">All streaming services</option>
            {STREAMING_SERVICES.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>))}
          </select>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 lg:grid-cols-3">
          {series?.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      </div>
    </div>  
  )
}
