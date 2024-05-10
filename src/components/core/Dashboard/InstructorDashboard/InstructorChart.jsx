import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");
    const [active, setActive] = useState(false);


    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels:courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    const handleIncome = () => {
        setCurrChart("income");
        setActive(false);
    }

    const handleStudent = () => {
        setCurrChart("students");
        setActive(true);
    }

    //create options
    const options = {

    };


  return (
    <div className='w-11/12 bg-richblack-800 flex flex-col '>
        <p className='text-richblack-5 text-lg font-bold mt-2 ml-2'>Visualise</p>
        <div className='flex gap-x-5 justify-center items-center -mt-2 '>
            <button 
            className={`cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold ${active ? " border-2 border-white text-richblack-5" : "border-2" } text-richblack-800 bg-yellow-100 active:scale-105 transition-all duration-200  `}
            onClick={handleStudent}
            >
                Student
            </button>

            <button
            className={`cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold ${active ? " border-2" : " border-2 border-white text-richblack-5 " } text-richblack-800 bg-yellow-100 active:scale-105 transition-all duration-200 `}
            onClick={handleIncome}
            >
                Income
            </button>
        </div>
      <div className='flex justify-center items-center w-1/2'>
        <Pie 
            data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
