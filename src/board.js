import { Grid } from '@mui/material';
import React from 'react';
import {DndContext, closestCorners} from '@dnd-kit/core';
import BoardContainer from './BoardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { updateStories } from './action';


const Board = () => {
    const items = useSelector( (state) => state.reducer.stories)
    const dispatch = useDispatch();
    
    const setItems = (stories) => dispatch(updateStories(stories));
    const findContainer = (id) =>{
        if (id in items) {
            return id;
        }

        return Object.keys(items).find((key) => items[key].find(({id: storyId}) => storyId === id));
    }
    
      const handleDragOver = (event) => {
        const { active, over, delta } = event;
        if(!over || !active) return;
        const { id } = active;
        const { id: overId } = over;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);
    
        if (
          !activeContainer ||
          !overContainer ||
          activeContainer === overContainer
        ) {
          return;
        }
        const activeItems = items[activeContainer];
          const overItems = items[overContainer];
    
          // Find the indexes for the items
          const activeIndex = activeItems.findIndex( ({id: storyId}) => id === storyId);
          const overIndex = (overItems.findIndex(({id: storyId}) => overId === storyId)) + (delta.y > 0 ? 1:0);

          const newItems = {
            ...items,
            [activeContainer]: [
              ...items[activeContainer].filter(({id: storyId}) => storyId !== active.id)
            ],
            [overContainer]: [
              ...items[overContainer].slice(0, overIndex),
              items[activeContainer][activeIndex],
              ...items[overContainer].slice(overIndex, items[overContainer].length)
            ]
          };
        setItems(newItems);
      }
    
      function handleDragEnd(event) {
        const { active, over, delta } = event;
        if(!over || !active) return;
        const { id } = active;
        const { id: overId } = over;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);
    
        if (
          !activeContainer ||
          !overContainer ||
          activeContainer === overContainer
        ) {
          return;
        }
        const activeItems = items[activeContainer];
        const overItems = items[overContainer];
  
        // Find the indexes for the items
        const activeIndex = activeItems.findIndex( ({id: storyId}) => id === storyId);
        const overIndex = (overItems.findIndex(({id: storyId}) => overId === storyId)) + (delta.y > 0 ? 1:0);

        const newItems = {
          ...items,
          [activeContainer]: [
            ...items[activeContainer].filter(({id: storyId}) => storyId !== active.id)
          ],
          [overContainer]: [
            ...items[overContainer].slice(0, overIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(overIndex, items[overContainer].length)
          ]
        };
      setItems(newItems);
      }
  return (
    <Grid container direction={'row'} sx={{bgcolor: 'inherit'}}>
        <DndContext 
            collisionDetection={closestCorners}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            {
                Object.keys(items).map( (storyStatus) => (<BoardContainer id={storyStatus} stories={items[storyStatus]} />) )
            }
        </DndContext>
    </Grid>
  );
 }

export default Board;