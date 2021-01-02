import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.json({
            error: "malformatted parameters"
        });
        return;
    }
    const bmi = calculateBmi(height, weight);
    res.json({
        weight: weight,
        height: height,
        bmi: bmi
    });

});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = req.body;
    if (!body.daily_exercises || !body.target) {
        res.json({
            error: "parameters missing"
        });
        return;
    }

    const dayNumeric: Array<number> = body.daily_exercises.map((day: any) => Number(day));
    const targetNumeric: number = Number(body.target);
    if (dayNumeric.some((day: number) => isNaN(day)) || isNaN(targetNumeric)) {
        res.json({
            error: "malformatted parameters"
        });
        return;
    }

    const result = calculateExercises(dayNumeric, targetNumeric);
    res.json({
        result
    });
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});