<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FotolA.pro - Convierte tus fotos en dinero</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    h1 {
      color: #333;
    }
    .status {
      margin: 20px 0;
      padding: 10px;
      background: #e8f5e9;
      border-radius: 4px;
      color: #2e7d32;
    }
    button {
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    input[type="file"] {
      margin: 20px 0;
    }
    #result {
      margin-top: 20px;
    }
    #packStatus {
      font-weight: bold;
      color: #1976d2;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>FotolA.pro</h1>
    <p>Convierte tus fotos en dinero</p>
    
    <div id="packStatus">
      <p>Pack: <span id="packCount">0</span> fotos restantes</p>
    </div>
    
    <
