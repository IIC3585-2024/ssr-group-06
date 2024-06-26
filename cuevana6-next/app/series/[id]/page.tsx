import { createClient } from '@/utils/supabase/server'
import SeriesDetail from '@/components/SeriesDetail';
import Header from '@/components/Header';

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params as { id: string }
    const supabase = createClient()

    const { data: series } = await supabase.from('series').select().eq('id', id).single()
    const { data: reviews } = await supabase
                                        .from('reviews')
                                        .select(`
                                            comment,
                                            rating,
                                            user_email,
                                            created_at
                                            `)
                                        .eq('series_id', id)

    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <SeriesDetail
                series={series}
                reviews={reviews}
            />
        </div>
    )
}
