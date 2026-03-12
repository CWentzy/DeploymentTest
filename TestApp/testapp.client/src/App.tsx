import { useEffect, useState } from 'react';
import './App.css';

const TestURL = '/WeatherForecast';
const TestURL2 = '/CardSearch';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

interface SearchResults {
    cardID: string;
    cardName: string;
    setCode: string;
    cardRarity: string;
}

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const [forecasts2, setForecasts2] = useState<SearchResults[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    useEffect(() => {
        populateWeatherData2();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    const contents2 = forecasts2 === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts2.map(card =>
                    <tr>
                        <td>{card.cardID}</td>
                        <td>{card.cardName}</td>
                        <td>{card.setCode}</td>
                        <td>{card.cardRarity}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            {contents2}
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('api' + TestURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setForecasts(data);
        }
    }

    async function populateWeatherData2() {
        const response = await fetch('api' + TestURL2);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setForecasts2(data);
        }
    }
}

export default App;