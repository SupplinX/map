import { FC } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface IProps {
    label: string;
    value: number;
}

export const EvaluationGraph: FC<IProps> = ({ value, label }) => {
    return (
        <div className='w-20'>
            <p className='mb-3 text-center text-sm'>{label}</p>
            <div className='w-20 h-20'>
                <CircularProgressbar value={value} text={`${value}%`} styles={{
                    path: {
                        stroke: '#44CE8B',
                    },
                    text: {
                        color: '#000',
                        stroke: '#000',
                        fontWeight: 400
                    }
                }} />
            </div>
        </div>
    )
}