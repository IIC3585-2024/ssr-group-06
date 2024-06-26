// src/components/SeriesForm.tsx
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/router';

const STREAMING_SERVICES = [
    { value: 'netflix', label: 'Netflix' },
    { value: 'max', label: 'MAX' },
    { value: 'amazon', label: 'Amazon Prime' },
    { value: 'disney', label: 'Disney+' },
    { value: 'hulu', label: 'Hulu' },
    { value: 'paramount', label: 'Paramount+' },
    { value: 'apple', label: 'Apple TV+' },
]

const CATEGORIES = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'drama', label: 'Drama' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'horror', label: 'Horror' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'romance', label: 'Romance' },
    { value: 'sci_fi', label: 'Sci-Fi' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'history', label: 'History' },
    { value: 'humor', label: 'Humor' },
]

const SeriesForm: React.FC = () => {
    const [name, setName] = useState('');
    const [streamingService, setStreamingService] = useState('');
    const [seasons, setSeasons] = useState('');
    const [episodesPerSeason, setEpisodesPerSeason] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();

        const { data, error } = await supabase.from('series').insert([
            {
                name,
                long_description: longDescription,
                streaming_service: streamingService,
                seasons: parseInt(seasons),
                episodes_per_season: parseInt(episodesPerSeason),
                categories,
                image_url: imageUrl,
            },
        ]);

        if (error) console.error('Error adding series:', error);
        else {
            setName('');
            setStreamingService('');
            setSeasons('');
            setEpisodesPerSeason('');
            setLongDescription('');
            setCategories([]);
            setImageUrl('');

            setTimeout(() => {
                setIsLoading(false);
                window.location.href = '/';
            }, 1000);
        }
    };

    return (
        (isLoading && <div className='h-screen flex flex-col justify-center items-center text-4xl'>
            <span className="loading loading-spinner loading-lg"></span>
            <span>Loading...</span>
        </div>) ||
        <div className="container mx-auto px-4 py-16">
            <a href="/" className="absolute top-2 left-0 m-2 p-4 w-32 btn btn-outline flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg> Back</a>
            <h1 className="text-2xl font-bold my-4">Add New Series</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="input input-bordered w-full"
                />
                <select
                    value={streamingService}
                    onChange={(e) => setStreamingService(e.target.value)}
                    required
                    className="select select-bordered w-full"
                >
                    <option value="" disabled>Streaming Service</option>
                    {STREAMING_SERVICES.map((service) => (
                        <option key={service.value} value={service.value}>
                            {service.label}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    value={seasons}
                    onChange={(e) => setSeasons(e.target.value)}
                    placeholder="Number of Seasons"
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="number"
                    value={episodesPerSeason}
                    onChange={(e) => setEpisodesPerSeason(e.target.value)}
                    placeholder="Episodes per Season"
                    required
                    className="input input-bordered w-full"
                />
                <textarea
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    placeholder="Description"
                    required
                    className="textarea textarea-bordered w-full"
                />
                <select
                    value={categories}
                    onChange={(e) => setCategories([e.target.value || 'drama'])}
                    required
                    className="select select-bordered w-full"
                >
                    <option value="" disabled />
                    {CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                    required
                    className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-primary w-full">Add Series</button>
            </form>
        </div>
    );
};

export default SeriesForm;
