require './constants'
require 'json'

while gets
  f = JSON.parse($_)
  config = Z_CONFIG[f['properties']['図式コード'].to_i]
  f['tippecanoe'] = {
    'layer' => config['layer'],
    'minzoom' => config['minzoom'] || ENV['MINZOOM'],
    'maxzoom' => config['maxzoom'] || ENV['MAXZOOM']
  }
  print JSON.dump(f), "\n"
end

