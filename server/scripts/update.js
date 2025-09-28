var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 0;

var models = require(path.resolve(__dirname, '../model-config.json'));
var datasources = require(path.resolve(__dirname, '../datasources.json'));

function autoUpdateAll() {
  console.log('Starting auto-update process...');
  console.log('Available models:', Object.keys(models));
  console.log('Available datasources:', Object.keys(datasources));
  
  let completed = 0;
  const totalModels = Object.keys(models).filter(key => 
    typeof models[key].dataSource !== 'undefined' && 
    typeof datasources[models[key].dataSource] !== 'undefined'
  ).length;
  
  if (totalModels === 0) {
    console.log('No models to update');
    return;
  }
  
  Object.keys(models).forEach(function(key) {
    console.log(`Processing model: ${key}`);
    if (typeof models[key].dataSource != 'undefined') {
      console.log(`Model ${key} uses datasource: ${models[key].dataSource}`);
      if (typeof datasources[models[key].dataSource] != 'undefined') {
        console.log(`Datasource ${models[key].dataSource} found, starting autoupdate...`);
        
        // Add timeout to prevent hanging
        const timeout = setTimeout(() => {
          console.error(`Timeout: Model ${key} autoupdate took too long`);
          process.exit(1);
        }, 30000); // 30 seconds timeout
        
        app.dataSources[models[key].dataSource].autoupdate(key, function(err) {
          clearTimeout(timeout);
          completed++;
          
          if (err) {
            console.error(`Error updating model ${key}:`, err);
            process.exit(1);
          }
          console.log(`✅ Model ${key} migrated successfully (${completed}/${totalModels})`);
          
          if (completed === totalModels) {
            console.log('🎉 All models migrated successfully!');
            process.exit(0);
          }
        });
      } else {
        console.log(`Datasource ${models[key].dataSource} not found in datasources config`);
      }
    } else {
      console.log(`Model ${key} has no dataSource defined`);
    }
  });
}
autoUpdateAll();