// src/components/SeriesCard.tsx
import React from 'react';

interface SeriesCardProps {
    series: {
        id: number;
        created_at: string;
        streaming_service: string;
        name: string;
        long_description: string;
        categories: string[];
        average_rating: number;
        seasons: number;
        episodes_per_season: number;
        image_url: string;
    };
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

const SeriesCard: React.FC<SeriesCardProps> = ({ series }) => {
    const MAX_RATING = 5;
    const rating = series.average_rating;
    const ratingStars = Array.from({ length: MAX_RATING }, (_, i) => {
        return <input type="radio" name="rating-2" className={i < rating ? 'mask mask-star-2 bg-orange-400' : 'mask mask-star-2'} readOnly disabled />;
    });

    const streamingServiceColor: string = STREAMING_SERVICES_COLORS[series.streaming_service.toLowerCase()];
    const streamingServiceBadgeClasses = `absolute top-0 right-0 m-2 p-4 badge border-0 font-semibold ${streamingServiceColor}`;
    const streamingServiceDisplayName = STREAMING_SERVICES_DISPLAY_NAMES[series.streaming_service.toLowerCase()];

    return (
    <a href={`/series/${series.id}`} className="card bg-base-100 w-64 md:w-56 shadow-xl">
        <figure>
            <img src={series.image_url} alt={series.name} className="w-full h-72 object-fill" />
            <div className={streamingServiceBadgeClasses}> {streamingServiceDisplayName} </div>
        </figure>
        <div className="flex flex-col items-center py-2 px-2">
            <h2 className="card-title mb-0.5">
                {series.name}
            </h2>

            <div className="flex flex-row justify-between items-center mb-2">
                { (series.categories || []).map((category) => (
                    <span className={`badge ${CATEGORY_BADGE_COLORS[category.toLowerCase()]} mr-1`}>
                        {category}
                    </span>
                )) }
            </div>

            <div className="rating mb-2">
                { ratingStars }
            </div>
        </div>
    </a>
    );
};

export default SeriesCard;
