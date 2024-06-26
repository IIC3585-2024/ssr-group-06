// src/components/SeriesForm.tsx
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const SeriesForm: React.FC<{ seriesId: number }> = ({ seriesId }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data: user, error }) => {
            if (!user.user) {
                window.location.href = '/login';
            }

            setIsLoading(false);
            setUserEmail((user.user as any).email);
        });
    });
        
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.from('reviews').insert([
            {
                comment,
                rating,
                series_id: seriesId,
                user_email: userEmail,

            }
        ]);

        if (error) console.error('Error adding series:', error);
        else {


            setTimeout(() => {
                window.location.href = `/series/${seriesId}`;
            });
        }
    };

    return (
        (isLoading && <div className='h-screen flex flex-col justify-center items-center text-4xl'>
            <span className="loading loading-spinner loading-lg"></span>
            <span>Loading...</span>
        </div>) ||

        <div className="container mx-auto w-1/2 bg-base-200 px-16 py-12 rounded-lg shadow-lg mt-8">
            <button onClick={() => window.location.href = `/series/${seriesId}`} className="btn btn-outline flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg> Back</button>
            <h1 className="text-2xl font-bold my-4">Add Review</h1>
            <div className="rating mb-4 w-full flex justify-center">
                <h1 className='mr-2 text-lg font-bold'>Score:</h1>
                <input type="radio" name="rating-2" className="mask mask-star" value="1" defaultChecked onChange={(e) => setRating(parseInt(e.target.value))} />
                <input type="radio" name="rating-2" className="mask mask-star" value="2" onChange={(e) => setRating(parseInt(e.target.value))} />
                <input type="radio" name="rating-2" className="mask mask-star" value="3" onChange={(e) => setRating(parseInt(e.target.value))} />
                <input type="radio" name="rating-2" className="mask mask-star" value="4" onChange={(e) => setRating(parseInt(e.target.value))} />
                <input type="radio" name="rating-2" className="mask mask-star" value="5" onChange={(e) => setRating(parseInt(e.target.value))} />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment"
                    required
                    className="textarea textarea-bordered h-24"
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default SeriesForm;
