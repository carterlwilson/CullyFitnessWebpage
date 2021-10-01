import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ExerciseCard(props) {
    return (
        <Card>
            <CardContent>
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
                        Weight: {props.weight}
                    </Typography>
            </CardContent>
        </Card>
    );
}