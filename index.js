const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.get('/temperatura', async (req, res) => {
  const ciudad = req.query.ciudad;
  
  if (!ciudad) {
    return res.status(400).json({ error: 'Debes proporcionar el nombre de la ciudad' });
  }

  const apiKey = 'c11479029e3e92eccd354c79d7ea76d8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.status === 200) {
      const temperatura = data.main.temp;
      res.json({ ciudad, temperatura });
    } else {
      res.status(response.status).json({ error: 'No se pudo obtener la temperatura' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});
