type RatingMessage = 'bad' | 'not too bad but could be better' | 'good';

interface ExerciseCalculator {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: RatingMessage,
    target: number,
    average: number
}

interface InputValues {
    days: Array<number>,
    target: number
}

const result = (target: number, real: number): number => {
    return real >= target ? 1 :
        real > target / 2 ? 2 : 3;
};

const calculateExercises = (days: Array<number>, target: number): ExerciseCalculator => {
    const periodLength = days.length;
    const average = days.reduce((a, b) => a + b, 0) / periodLength;
    const rating = result(target, average);
    return {
        average: average,
        periodLength: periodLength,
        rating: rating,
        ratingDescription: ratingDescription(rating),
        success: rating === 1,
        target: target,
        trainingDays: days.filter(day => day > 0).length
    };
};

const ratingDescription = (rating: number): RatingMessage => {
    return rating === 1 ? 'good' :
        rating === 2 ? 'not too bad but could be better' :
            'bad';
};

const parseArguments = (args: Array<string>) : InputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const numArguments = args.slice(2).map(arg => {
        const num = Number(arg);
        if (isNaN(num)) {
            throw new Error('Provided values were not numbers!');
        }
        return num;
    });
    return {
        days: numArguments.slice(1),
        target: numArguments[0]
    };
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
const args = parseArguments(process.argv);
console.log(calculateExercises(args.days, args.target));