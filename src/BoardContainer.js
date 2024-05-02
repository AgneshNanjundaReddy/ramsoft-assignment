import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Grid, Paper } from "@mui/material";
import StoryCard from "./StoryCard";
import { states } from "./constants";

export default ({id, stories}) => {
    const containerStyle = {
        background: "#dadada",
        padding: 10,
        margin: 10,
        flex: 1
      };
    const { setNodeRef } = useDroppable({
        id
      });
      
    return (
    <Grid item container xs={2} spacing={2} direction={'column'} key={id} >
        <Paper elevation={2} square sx={{background: "#dadada",margin: '10px',padding: '1em'}}>
            {states[id]}
        </Paper>
        <SortableContext items={stories} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} style={containerStyle}>
        {
            stories.map( (story) => (
                <StoryCard story={story} />
            )) 
        }
        </div>
        </SortableContext>
    </Grid>
)}