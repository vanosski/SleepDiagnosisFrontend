// UserInput.js
import React, { useState } from 'react';

const UserInput = ({
    numDays,
    setNumDays,
    dailyData,
    setDailyData,
    userInfo,
    handleUserInfoChange,
    handleInputChange,
    setupTable,
}) => {
    const [daysInput, setDaysInput] = useState(''); // Controlled input for days

    const handleDaysChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setDaysInput(e.target.value); // Keep input controlled
        if (!isNaN(value) && value > 0) setNumDays(value); // Update numDays
    };

    return (
        <div id="data-entry">
            <h3 align="center">User Information</h3>

            <label htmlFor="age">Age:</label>
            <input
                type="number"
                id="age"
                name="age"
                placeholder="Your Age"
                onChange={handleUserInfoChange}
                min="1"
                required
            />

            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" onChange={handleUserInfoChange} required>
                <option value="">Select Gender</option> {/* Default option */}
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                onChange={handleUserInfoChange}
                required
            />

            <label htmlFor="email"  >Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                onChange={handleUserInfoChange}
                required
            />

            <label htmlFor="days">Number of Days to Input:</label>
            <input
                type="number"
                id="days"
                value={daysInput}
                onChange={handleDaysChange}
                placeholder="Number of Days"
                min="1"
                required
            />

<div id="button2"><button id="submit-button" onClick={setupTable}>Start Input</button></div>

            {numDays > 0 && (
                <div id="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Sleep Duration (hrs)</th>
                                <th>Activity Level (1-10)</th>
                                <th>Stress Level (1-10)</th>
                                <th>Quality of Sleep (1-10)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: numDays }, (_, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            max="24"
                                            onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            onChange={(e) => handleInputChange(index, 'stress', e.target.value)}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            onChange={(e) => handleInputChange(index, 'quality', e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserInput;
