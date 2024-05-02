export const CREATE = 'CREATE';
export const SET_STORIES = 'SET_STORIES';

export const createStory = (story) => ({
    type: CREATE,
    story
})


export const updateStories = (stories) => ({
    type: SET_STORIES,
    stories
})
