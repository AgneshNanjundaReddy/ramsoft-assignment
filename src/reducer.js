import { CREATE, SET_STORIES } from "./action"

const stories = {
  new: [
      { id: '1', name: "First Task", status: "new" },
      { id: '2', name: "Second Task", status: "new" },
      { id: '3', name: "Third Task", status: "new" },
  ],
  inProgress: [
      { id: '6', name: "Sixth Task", status: "inProgress" },
  ],
  review: [
      { id: '7', name: "Seventh Task", status: "review" },
      { id: '8', name: "Eighth Task", status: "review" },
  ],
  dev: [],
  test: [],
  done: [
      { id: '9', name: "Ninth Task", status: "done" },
      { id: '10', name: "Tenth Task", status: "done" },
  ]
}
const initState = {
  states: ['new', 'inProgress', 'review', 'dev', 'test', 'done'],
  stories
}
export default (state = initState, action) => {
    switch (action.type) {
     case CREATE:
        return {
          ...state,
          stories: {
            ...state.stories,
            new: [ 
              ...state.stories['new'],
              action.story]
          }
        }
      case SET_STORIES:
        return {
          ...state,
          stories: {...action.stories}
        }
     default:
      return state
    }
   }