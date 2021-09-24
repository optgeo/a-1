require './constants'

desc 'download maplibre-gl files'
task :maplibre do
  %w{
https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css
https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.js
  }.each {|url|
    sh <<-EOS
curl -o docs/#{url.split('/')[-1]} #{url}
    EOS
  }
end

desc 'produce tiles'
task :tiles do
end

desc 'generate style.json'
task :style do
end

desc 'host the site locally'
task :host do
  sh "budo -d docs"
end

desc 'run vt-optimizer'
task :optimize do
  sh "node ~/vt-optimizer/index.js -m #{MBTILES_PATH}"
end

