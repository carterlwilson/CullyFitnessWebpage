import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExerciseInfo from '../../Models/ExerciseInfo';
import ExerciseCard  from '../ExerciseCard';
import { Button } from '@mui/material';
import './Workout.css';

export default function Workout(props) {

    const [client, setClient] = useState(props.location.state.client);
    const [multipliers, setMultipliers] = useState(props.location.state.multipliers);
    const [iterations, setIterations] = useState(props.location.state.iterations); 
    const [exercises, setExercises] = useState([]);
    const [dayId, setDayId] = useState(100);
    
    const dayOneButtonColor = () => {
        if (dayId === 1) {
            return "secondary"
        }
        else return "primary"
    }

    const dayTwoButtonColor = () => {
        if (dayId === 2) {
            return "secondary"
        }
        else return "primary"
    }

    useEffect(() => {
        getExercises();
    }, [dayId]);

    useEffect(() => {}, [exercises]);

    const exerciseCards = exercises.map((exercise) =>
        <ExerciseCard name={exercise.name} sets={exercise.sets} reps={exercise.reps} weight={exercise.weight}/>
    );

    return (
        <div>
            <Button 
                variant='contained'
                onClick={setButton1}
            >
                Day 1
            </Button>
            <Button 
                variant='contained'
                onClick={setButton2}
            >
                Day 2
            </Button>
            {exerciseCards}
        </div>
    )

    function setButton1() {
        setDayId(1);
    }

    function setButton2() {
        setDayId(2);
    }

    function convertDay(dayNum) {
        switch(dayNum) {
            case 0:
                return 1;
            case 1:
                return 1;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 2;
            case 5:
                return 2;
            case 6:
                return 2;
            default:
                break;
        }
    }

    function getExercises() {
        let block = iterations.Block;
        let week = iterations.Week;
        let date = new Date();
        let day = date.getDay();
        let exerciseList = [];
        let dailyMultiplierList = [];

        multipliers.forEach((multiplier) => {
            let convertedDay = 0;
            if (dayId === 100) {
                convertedDay = convertDay(day);
            }
            else convertedDay = dayId;
            if (multiplier.DayId === convertedDay) {
                dailyMultiplierList.push(multiplier);
            }            
        })

        dailyMultiplierList.forEach((multiplier) => {
            let name = multiplier.Name;
            let sets = multiplier.Multipliers[block-1].Weeks[week-1].Sets;
            let reps = multiplier.Multipliers[block-1].Weeks[week-1].Reps;
            let weightMultiplier = multiplier.Multipliers[block-1].Weeks[week-1].Multiplier;

            let max = client.maxes[name];
            let weight = Math.round(weightMultiplier * max);

            let newExercise = new ExerciseInfo(name, sets, reps, weight);

            exerciseList.push(newExercise);
        })

        setExercises(exerciseList);
    }
}