import React, { useState } from 'react';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);

  const formatDate = (inputDate, options) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString('pl', options);
  };
  
  const formatBirthdate = (birthdate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return formatDate(birthdate, options);
  };
  
  const formatRegistrationDate = (registrationDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return formatDate(registrationDate, options);
  };

  const handleFetchNewUser = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      setUserData(data.results[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="App">
      <button onClick={handleFetchNewUser}>Losuj Nowego Użytkownika</button>
        {userData && (
          <div>
            <img src={userData.picture.large} alt=""/>
            <p>
              Imię i nazwisko: {userData.name.title} {userData.name.first} {userData.name.last}
            </p>
            <p>Email: {userData.email}</p>
            <p>Telefon: {userData.phone}</p>
            <p>Adres: {userData.location.street.name} {userData.location.street.number}, {userData.location.city}</p>
            <p>Region: {userData.location.state}, {userData.location.country}</p>
            <p>Kod pocztowy: {userData.location.postcode}</p>
            <p>Data urodzenia: {formatBirthdate(userData.dob.date)}</p>
            <p>Wiek: {userData.dob.age} lat</p>
            <p>Data rejstracji: {formatRegistrationDate(userData.registered.date)}</p>
            <p>Telefon komórkowy: {userData.cell}</p>
          </div>
        )}
    </div>
  );
}

export default App;
