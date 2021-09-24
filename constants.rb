require 'yaml'

SRC_DIR = 'src'

URLS_PATH = 'urls.txt'

MBTILES_PATH = 'tiles.mbtiles'

DESIGN = YAML.load <<-EOS
-
  z: 11
  glob: #{SRC_DIR}/vector_shp_2500**/*
EOS

