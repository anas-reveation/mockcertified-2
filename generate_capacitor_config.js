// generate_capacitor_config.js

const ip = require('ip');
const fs = require('fs');
const path = require('path');
const capacitorConfigDev = require('./capacitor.config.dev.json');
const capacitorConfigProd = require('./capacitor.config.prod.json');

const configPath = path.resolve(__dirname, 'capacitor.config.json');

// const isHotspotting =
//   // Samsung A5 + Macbook
//   ip.address() === '192.168.43.101' && process.env.NODE_ENV !== 'production';

if (process.env.NODE_ENV === 'production') {
  // support HMR on device
  fs.writeFileSync(configPath, JSON.stringify(capacitorConfigProd));
} else {
  fs.writeFileSync(configPath, JSON.stringify(capacitorConfigDev));
}
