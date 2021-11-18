const style = href => {
  const e = document.createElement('link')
  e.href = href
  e.rel = 'stylesheet'
  document.head.appendChild(e)
}

const script = src => {
  const e = document.createElement('script')
  e.src = src
  document.head.appendChild(e)
}

const init = () => {
  style('style.css')
  style('maplibre-gl.css')
  script('maplibre-gl.js')
  const map = document.createElement('div')
  map.id = 'map'
  document.body.appendChild(map)
}
init()

const showMap = async (texts) => {
  const map = new maplibregl.Map({
    container: 'map',
    hash: true,
    style: 'style.json',
    center: [39.541, -69.019],
    zoom: 11.77,
    maxZoom: 18
  })
  map.addControl(new maplibregl.NavigationControl())
  map.addControl(new maplibregl.ScaleControl({
    maxWidth: 200, unit: 'metric'
  }))

  let voice = null
  for(let v of speechSynthesis.getVoices()) {
    console.log(v.name)
    if ([
      'Daniel',
      'Google UK English Male',
      'Microsoft Libby Online (Natural) - English (United Kingdom)'
    ].includes(v.name)) voice = v
  }

  const legend = {
    0: 'created, never classified',
    1: 'unclassified',
    2: 'ground',
    3: 'low vegetation',
    4: 'medium vegetation',
    5: 'high vegetation',
    6: 'building',
    7: 'low point, or low noise',
    8: 'high point, typically high noise',
    9: 'water',
    10: 'rail',
    11: 'road surface',
    12: 'bridge deck',
    13: 'wire, guard',
    14: 'wire, conductor',
    15: 'transmission tower',
    16: 'wire-structure connector, such as insulator'
  }

  map.on('load', () => {
    map.on('click', 'voxel', (e) => {
      let u = new SpeechSynthesisUtterance()
      u.lang = 'en-GB'
      u.text = legend[e.features[0].properties.classification]
      if (!u.text) u.text = 'reserved or user definable.'
      if (voice) u.voice = voice
      speechSynthesis.cancel()
      speechSynthesis.speak(u)
    })

  })
}

const main = async () => {
  if (typeof maplibregl == 'undefined') {
    window.onload = () => {
      showMap()
    }
  } else {
    showMap()
  }
}
main()
