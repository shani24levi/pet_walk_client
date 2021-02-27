import * as React from 'react'
import { Pie } from 'react-chartjs-2';


const Chart = (props) => {
    const { mydata } = props;

    let charData = {
        labels: ['Done', 'Left'],
        datasets: [{
            data: [mydata, 100 - mydata],
            backgroundColor: ['rgb(110, 168, 255)', 'rgb(255, 255, 255)']
        }]
    }

    const pieOptions = {
        legend: {
            display: false,
            position: "right",
        },
        elements: {
            arc: {
                borderWidth: 1
            }
        }
    };

    return (
        <Pie 
            onElementsClick={props.onClick}
            data={charData}
            options={pieOptions}
        />
    )
}

export default Chart