// src/components/SeriesDetail.tsx
import React from 'react';

interface SeriesDetailProps {
    series: {
        id: number;
        created_at: string;
        name: string;
        streaming_service: string;
        long_description: string;
        categories: string[];
        average_rating: number;
        seasons: number;
        episodes_per_season: number;
        image_url: string;
    },
    reviews: {
        comment: string;
        rating: number;
        created_at: string;
        user_email: string;
    }[]
}

const STREAMING_SERVICES_COLORS: Record<string, string> = {
    netflix: 'bg-red-400 text-white',
    max: 'bg-blue-800 text-white',
    amazon: 'bg-blue-500 text-white',
    disney: 'bg-blue-400 text-white',
    hulu: 'bg-green-400 text-white',
    paramount: 'bg-indigo-400 text-white',
    apple: 'bg-gray-800 text-white',
};

const STREAMING_SERVICES_DISPLAY_NAMES: Record<string, string> = {
    netflix: 'Netflix',
    max: 'MAX',
    amazon: 'Amazon Prime',
    disney: 'Disney+',
    hulu: 'Hulu',
    paramount: 'Paramount+',
    apple: 'Apple TV+',
};

const CATEGORY_BADGE_COLORS: Record<string, string> = {
    action: 'bg-red-500 text-white',
    adventure: 'bg-yellow-500 text-white',
    comedy: 'bg-green-500 text-white',
    drama: 'bg-blue-500 text-white',
    fantasy: 'bg-indigo-500 text-white',
    horror: 'bg-purple-500 text-white',
    mystery: 'bg-pink-500 text-white',
    romance: 'bg-red-500 text-white',
    sci_fi: 'bg-blue-500 text-white',
    thriller: 'bg-gray-500 text-white',
    history: 'bg-yellow-500 text-white',
    humor: 'bg-green-500 text-white',
};

const SeriesDetail: React.FC<SeriesDetailProps> = ({ series, reviews }) => {
    const MAX_RATING = 5;
    const rating = series.average_rating;
    const ratingStars = Array.from({ length: MAX_RATING }, (_, i) => {
        return <input type="radio" name="rating-2" className={i < rating ? 'mask mask-star-2 bg-orange-400' : 'mask mask-star-2'} readOnly disabled />;
    });

    const streamingServiceColor: string = STREAMING_SERVICES_COLORS[series.streaming_service.toLowerCase()];
    const streamingServiceBadgeClasses = `badge border-0 font-semibold ${streamingServiceColor}`;
    const streamingServiceDisplayName = STREAMING_SERVICES_DISPLAY_NAMES[series.streaming_service.toLowerCase()];

    return (
    <div className="flex flex-col w-full px-2 md:px-12 md:py-16">
        <a href="/" className="md:absolute top-2 left-0 m-2 p-4 w-32 btn btn-outline flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg> Back</a>
        <div className="flex flex-col md:items-start items-center md:flex-row">
            <div className="artboard phone-1">
                <img src={series.image_url} alt={series.name}/>
            </div>

            <div className="flex-1 flex flex-col gap-2 p-4">
                <h1 className="text-3xl font-bold flex items-center gap-4">
                    {series.name}    
                    <div className={streamingServiceBadgeClasses}>{streamingServiceDisplayName} </div>
                </h1>
                <div className="flex gap-2">
                    <div className="flex gap-2">
                        {series.categories.map((category) => {
                            const categoryBadgeColor = CATEGORY_BADGE_COLORS[category.toLowerCase()];
                            return <div className={`badge border-0 font-semibold ${categoryBadgeColor}`}>{category}</div>
                        })}
                    </div>
                </div>
                <div className="rating mb-2">
                    { ratingStars }
                </div>
                <p>{series.long_description}</p>
                <p>Seasons: {series.seasons}</p>
                <p>Episodes per season: {series.episodes_per_season}</p>
            </div>
        </div>
        <div className="divider">User Reviews</div>
        <a className="btn btn-primary self-center md:w-1/3 mb-4" href={`/series/${series.id}/review`}>Add Review</a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => {
                const reviewRatingStars = Array.from({ length: MAX_RATING }, (_, i) => {
                    return <input type="radio" name="rating-2" className={i < review.rating ? 'mask mask-star-2 bg-orange-400' : 'mask mask-star-2'} readOnly disabled />;
                });

                return (
                    <div className="card bg-base-300 rounded-box grid h-20 py-4 px-8">
                        <div className="flex flex-row gap-2 justify-between">
                            <h2 className="card-subtitle">{review.user_email}</h2>
                            <div className="rating">
                                {reviewRatingStars}
                            </div>
                        </div>
                        <p>{review.comment}</p>
                    </div>
                );
            })}
        </div>
    </div>
    );
};

export default SeriesDetail;
