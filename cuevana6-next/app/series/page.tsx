import { createClient } from '@/utils/supabase/server'
import SeriesCard from '@/components/SeriesCard';

export default async function Page() {
  const supabase = createClient()
  const { data: series } = await supabase.from('series').select()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {series?.map((series) => (
        <SeriesCard key={series.id} series={series} />
      ))}
    </div>
  )
}
