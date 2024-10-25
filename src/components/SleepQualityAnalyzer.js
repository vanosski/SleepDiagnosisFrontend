import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js'; 

// Register the scales
Chart.register(CategoryScale, LinearScale, BarElement);

const SleepQualityAnalyzer = () => {
    const [numDays, setNumDays] = useState(0);
    const [dailyData, setDailyData] = useState([]);
    const [userInfo, setUserInfo] = useState({ age: '', gender: '', name: '', email: '' });
    const [predictedQuality, setPredictedQuality] = useState('N/A');
    const [setAverageDuration] = useState(0); 
    const [diagnosisMessage, setDiagnosisMessage] = useState('');
    const [diagnosisVisible, setDiagnosisVisible] = useState(false);
    
    const daysInputRef = useRef();

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const setupTable = () => {
        const days = parseInt(daysInputRef.current.value, 10);
        if (!isNaN(days) && days > 0) {
            setNumDays(days);
            setDailyData(new Array(days).fill({ duration: 0, activity: 0, stress: 0, quality: 0 }));
        } else {
            alert('Please enter a valid number of days.');
        }
    };

    const handleInputChange = (index, field, value) => {
        const newDailyData = [...dailyData];
        newDailyData[index] = { ...newDailyData[index], [field]: parseFloat(value) || 0 }; // Ensure the input updates correctly
        setDailyData(newDailyData);
    };

    const trainModel = async () => {
        try {
            console.log('User Info:', userInfo);
            console.log('Daily Data:', dailyData);
            
            const response = await fetch(`https://sleepdiagnosisbackend.onrender.com/api/train`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userInfo, dailyData }),
            });
    
            const data = await response.json();
            console.log('Response Data:', data); // Log the response data
            
            if (response.ok) {
                const avgDuration = data.averageDuration; // Get average duration from response
                setAverageDuration(avgDuration); // Set average duration in state

                // Set visibility of the diagnosis section based on avgDuration
                setDiagnosisVisible(avgDuration <= 5); // Show diagnosis section if average duration <= 5

                console.log('Average Duration:', avgDuration);
                alert('Model trained successfully!');
            } else {
                console.error('Training failed:', data.message);
                alert(`Training failed: ${data.message}`);
            }
        } catch (error) {
            
        }
    };
    
    const predictQualityForFutureDay = async () => {
        const duration = parseFloat(document.getElementById('predict-duration').value);
        const activity = parseFloat(document.getElementById('predict-activity').value);
        const stress = parseFloat(document.getElementById('predict-stress').value);

        try {
            const response = await fetch(`https://sleepdiagnosisbackend.onrender.com/api/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ duration, activity, stress }),
            });

            const data = await response.json();
            if (response.ok) {
                setPredictedQuality(data.predictedQuality.toFixed(2));
            } else {
                console.error('Prediction failed:', data.message);
            }
        } catch (error) {
            console.error('Error during prediction:', error);
        }
    };

    const processDiagnosis = () => {
        const snoring = document.querySelector('input[name="snoring"]:checked')?.value;
        const awakenings = document.querySelector('input[name="awakenings"]:checked')?.value;

        const message =
            snoring === 'yes'
                ? 'You may have sleep apnea. Please consult a healthcare professional.'
                : awakenings === 'yes'
                ? 'You may have insomnia. Consider improving your sleep habits.'
                : 'Your sleep duration is below recommended levels. Improve your sleep habits.';

        setDiagnosisMessage(message);
    };

    // Prepare data for Chart.js
    const chartData = {
        labels: Array.from({ length: numDays }, (_, i) => `Day ${i + 1}`),
        datasets: [
            {
                label: 'Sleep Quality',
                data: dailyData.map((data) => data.quality), // Use the quality data for each day
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div>
            <h1 align="center">SLEEP DIAGNOSIS RECCOMENDER</h1>

            <div id="data-entry">
                <h3 align="center">User Information</h3>
                <input type="number" name="age" placeholder="Age" onChange={handleUserInfoChange} />
                <select name="gender" onChange={handleUserInfoChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input type="text" name="name" placeholder="Name" onChange={handleUserInfoChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleUserInfoChange} />
                <input type="number" ref={daysInputRef} placeholder="Number of Days" />
                <div id="button2"><button id="submit-button" onClick={setupTable}>Start Input</button></div>
            </div>

            {numDays > 0 && (
                <div id="data-table" align="center">
                    <table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Sleep Duration</th>
                                <th>Activity Level</th>
                                <th>Stress Level</th>
                                <th>Sleep Quality</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dailyData.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><input type="number" onChange={(e) => handleInputChange(index, 'duration', e.target.value)} /></td>
                                    <td><input type="number" onChange={(e) => handleInputChange(index, 'activity', e.target.value)} /></td>
                                    <td><input type="number" onChange={(e) => handleInputChange(index, 'stress', e.target.value)} /></td>
                                    <td><input type="number" onChange={(e) => handleInputChange(index, 'quality', e.target.value)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button align="center" id="train-button" onClick={trainModel}>Train Model</button>
                </div>
            )}

            <div id="prediction">
                <h3>Predict Sleep Quality</h3>
                <input type="number" id="predict-duration" placeholder="Duration" />
                <input type="number" id="predict-activity" placeholder="Activity Level" />
                <input type="number" id="predict-stress" placeholder="Stress Level" />
                <div id="button2"><button id="predict-button" onClick={predictQualityForFutureDay}>Predict Quality</button></div>
                <h4>Predicted Quality: {predictedQuality}</h4>
            </div>

            {diagnosisVisible && (
                <div id="diagnosis" align="center">
                    <h3>Diagnosis</h3>
                    <p>Do you snore at night?</p>
                    <label><input type="radio" name="snoring" value="yes" /> Yes</label>
                    <label><input type="radio" name="snoring" value="no" /> No</label>
                    <p>Do you wake up often at night?</p>
                    <label><input type="radio" name="awakenings" value="yes" /> Yes</label>
                    <label><input type="radio" name="awakenings" value="no" /> No</label>
                    <br />
                    <button id="diagnosis-button" onClick={processDiagnosis}>Get Diagnosis</button>
                    {diagnosisMessage && <p>{diagnosisMessage}</p>}
                </div>
            )}
<div align="center">
<div id="chart" align="center" style={{ width: '60%', height: '400px' }}>
    <h3>Sleep Quality Over Time</h3>
    <Bar
        data={chartData}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: 'lavender', // X axis tick text color
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'lavender', // Y axis tick text color
                        stepSize: 1,
                    },
                },
            },
        }}
        style={{ height: '400px', width: '100%' }}
    />
</div>

</div>

        </div>
    );
};

export default SleepQualityAnalyzer;
