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
  cmd = '('
  DESIGN.each {|design|
    files = Dir.glob(design['glob']).sort.select {|path|
      /(SHP|shp)$/.match path
    }
    cmd += <<-EOS
parallel --line-buffer --jobs=#{JOBS} \
'ogr2ogr -f GeoJSONSeq /vsistdout/ {} -dim 2 \
-oo ENCODING=CP932' ::: \
#{files.join(' ')} | \
MINZOOM=#{design['minzoom']} MAXZOOM=#{design['maxzoom']} \
ruby filter.rb ; 
    EOS
    cmd = cmd.strip
  }
  cmd += ') |'
  cmd += <<-EOS
tippecanoe --force --output #{MBTILES_PATH} \
--maximum-zoom=#{MAXZOOM} --minimum-zoom=#{MINZOOM} \
--no-tile-size-limit --no-feature-limit; \
tile-join --force --output-to-directory=docs/zxy \
--no-tile-size-limit --no-tile-compression \
--maximum-zoom=#{MAXZOOM} --minimum-zoom=#{MINZOOM} \
#{MBTILES_PATH}
  EOS
  sh cmd
end

desc 'generate style.json'
task :style do
  sh "charites build style/style.yml docs/style.json"
end

desc 'host the site locally'
task :host do
  sh "budo -d docs"
end

desc 'run vt-optimizer'
task :optimize do
  sh "node ~/vt-optimizer/index.js -m #{MBTILES_PATH}"
end

