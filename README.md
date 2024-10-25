# Sleep Diagnosis Reccomender - Frontend

## Description
The **Sleep Diagnosis Recommender** is a full-stack web application designed to help users track their sleep patterns and receive personalized recommendations based on their input data. Built with **React** for the frontend and **Node.js** with **Express** for the backend, this application leverages a machine learning model to analyze daily sleep metrics.

Users can log essential sleep-related data, including sleep duration, activity levels, stress levels, and perceived sleep quality. The application integrates a predictive machine learning model hosted on the backend, which processes the data to provide insights into sleep quality and potential sleep disorders. 

### Technologies Used
- **Frontend**: 
  - **React**: For building dynamic user interfaces.
  - **JavaScript**: For application logic.
  - **HTML5 & CSS3**: For structuring and styling the application.
  - **Chart.js**: For visualizing sleep quality trends.

- **Backend**:
  - **Node.js**: For server-side logic.
  - **Express**: For building RESTful APIs.
  - **Machine Learning**: Custom algorithms for analyzing sleep data and predicting quality.

### Backend Repository
The backend for this project is available at: [Sleep Diagnosis Recommender - Backend](https://github.com/vanosski/SleepDiagnosisBackend)

### Overview
This frontend application is built using **React** and provides a user-friendly interface for entering sleep data and viewing predictions. Users can log their sleep duration, activity levels, stress levels, and perceived sleep quality. The application utilizes a machine learning model hosted on the backend to analyze this data and generate predictions and recommendations.

### Key Features
- **User Information Input**: Collect basic user details such as age, gender, name, and email.
- **Daily Sleep Data Entry**: Log daily sleep metrics including duration, activity level, stress level, and quality.
- **Model Training**: Analyze user data to train a predictive model for future sleep quality.
- **Predictions**: Get predictions for future sleep quality based on entered metrics.
- **Diagnosis**: Receive recommendations based on user responses regarding sleep-related issues like snoring and awakenings.
- **Data Visualization**: Visualize sleep quality trends over time using charts.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/vanosski/SleepDiagnosisFrontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SleepDiagnosisFrontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage
1. Fill in the user information form.
2. Input daily sleep metrics for the desired number of days.
3. Click on the "Train Model" button to analyze the data.
4. Use the prediction feature to get estimates of future sleep quality.
5. Check the diagnosis section for insights into potential sleep issues.

## Contributing
Contributions are welcome! If you have suggestions for improvements or features, please open an issue or submit a pull request.
