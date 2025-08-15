'use server';

import samplePosts from '@/lib/constants/sample-posts.json';

export async function readPostsAction(): Promise<MyNextApp.Posts[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
                resolve(samplePosts);
            }, 2000);
        });
}
