import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@mui/material";

const StoryCard = ({story}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
      } = useSortable({ id: story.id });
      const style = {
        transform: CSS.Transform.toString(transform),
        transition
      };
    return (
        <div key={story.id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card sx={{margin: '1rem'}}>
            <CardContent>
                {story.name}
            </CardContent>
        </Card>
        </div>
)}

export default StoryCard;