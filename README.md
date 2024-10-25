# Sleep Quality Analyzer - Frontend

## Description
The **Sleep Quality Analyzer** is a web application designed to help users track their sleep patterns and receive personalized recommendations based on their input data. By analyzing daily sleep metrics, the application predicts sleep quality and identifies potential sleep disorders, providing valuable insights to improve overall well-being.

### Project Overview
This frontend application is built using **React** and provides a user-friendly interface for entering sleep data and viewing predictions. Users can log their sleep duration, activity levels, stress levels, and perceived sleep quality. The application utilizes a machine learning model hosted on the backend to analyze this data and generate predictions and recommendations.

### Key Features
- **User Information Input**: Collect basic user details such as age, gender, name, and email.
- **Daily Sleep Data Entry**: Log daily sleep metrics including duration, activity level, stress level, and quality.
- **Model Training**: Analyze user data to train a predictive model for future sleep quality.
- **Predictions**: Get predictions for future sleep quality based on entered metrics.
- **Diagnosis**: Receive recommendations based on user responses regarding sleep-related issues like snoring and awakenings.
- **Data Visualization**: Visualize sleep quality trends over time using charts.

## Technologies Used
- **React**: For building user interfaces.
- **JavaScript**: For application logic.
- **HTML5 & CSS3**: For structuring and styling the application.
- **Chart.js**: For creating interactive charts and graphs.

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

## Backend Repository
The backend for this project is available at: [Sleep Diagnosis Recommender - Backend](https://github.com/vanosski/SleepDiagnosisBackend)

## Contributing
Contributions are welcome! If you have suggestions for improvements or features, please open an issue or submit a pull request.
