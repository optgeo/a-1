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

desc 'download data'
task :download do
  File.foreach(URLS_PATH) {|l|
    url = l.strip
    path = "#{SRC_DIR}/#{url.split('/')[-1]}"
    sh "curl -o #{path} #{url}" unless File.exist?(path)
    sh "unar -o #{SRC_DIR} #{path}"
  }
end

desc 'produce tiles'
task :tiles do
  DESIGN.each {|design|
    Dir.glob(design['glob']).sort.each {|path|
      next unless /(SHP|shp)$/.match path
      p path
    }
  }
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

