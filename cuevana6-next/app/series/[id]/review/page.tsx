'use client';

import AddReviewForm from '@/components/AddReviewForm';

export default async function Page({ params }: { params: { id: number } }) {
    const { id } = params as { id: number }

    return (
        <div className="container mx-auto px-4">
            <AddReviewForm seriesId={id} />
        </div>
    );
};
