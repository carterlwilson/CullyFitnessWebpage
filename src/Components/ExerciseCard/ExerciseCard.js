import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './ExerciseCard.css';

export default function ExerciseCard(props) {
    return (
        <Card className="ExerciseCard">
            <CardContent>
                    <Typography variant="body1" gutterBottom>
                        Max: {props.max}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Exercise: {props.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Sets: {props.sets}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Reps: {props.reps}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Weight: {props.weight} ({props.multiplier * 100}% of {props.max})
                    </Typography>
            </CardContent>
        </Card>
    );
}