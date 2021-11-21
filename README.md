# a-1
Antarctic prototype 1 - part of [63ants](https://github.com/optgeo/63ants)

# Demo
https://optgeo.github.io/a-1

# Install
You need [equinox](https://github.com/unvt/equinox) to produce, style, host, and optimize vector tiles from this repository. 

# Use
## Download ZIP files
```zsh
rake download
```

## Produce vector tiles
```zsh
rake tiles
```

## Generate style.json
```zsh
rake style
```

## Host the site locally
```zsh
rake host
```

## Run vt-optimizer
```zsh
rake optimize
```

# Attribution
Data are from Geospatial Information Authority of Japan (GSI).

Sprites are hosted by Geolonia. See also: https://github.com/geolonia/sprites.geolonia.com.

# See Also
https://github.com/optgeo/63ants/discussions/2

# メモ
## 要件について
現場運用を「紙地図とハンディGPS」から「スマートフォン端末」に順次切り替えていきたい。インキュベーション的な試行ののち、数年のうちに本格導入できると良い。

インターネットが使えない場所でもオンプレミスで地図が使えるようにする。例えば、雪上車走行ルートの GPS トラックが取れるようになると良い。ユースケースによって要求されるスケールが異なることも特徴。具体的には次の通り。

1. 基地管理情報はメートルスケール
2. ルート情報は km スケール
3. 氷床表面データは 100km スケール

昭和基地では限られた場所でインターネットを使用できる。12月中に到着することになる。2023年2月に昭和基地を離れることになり、2023年3月に帰国することになる。

フィールドシーズンは12月である。越冬期間中はフィールドシーズンではない。

## レイヤ設計
### レイヤ順序
1. area
2. coastline
3. contour
4. line
5. building
6. symbol

## レイヤと図式コードの対応づけ
[ソースデータの仕様](https://www.gsi.go.jp/antarctic/contents/000210995.pdf)

### area
- 9501: 露岩域 `rgb(214, 216, 212)`
- 9601: 雪氷域 `rgb(205, 230, 253)`

### coastline
- 3101: 水涯線通常部

### contour (`rgb(200, 160, 60)`)
- 91: 等高線非表示部
- 8201: 計曲線通常部 - 標高（HYOUKOU）
- 8204: 計曲線凹地 - 標高(m)
- 8211: 主曲線通常部
- 8214: 主曲線凹地
- 8221: 補助曲線通常部
- 8222: 補助曲線数値部
- 8224: 補助曲線凹地
- 8811: 土崖（被覆）
- 9201: 雪氷域計曲線（通常部）
- 9204: 雪氷域計曲線（凹地）
- 9211: 雪氷域主曲線（通常部）
- 9212: 雪氷域主曲線（数値部）
- 9214: 雪氷域主曲線（凹地）
- 9221: 雪氷域補助曲線（通常部）
- 9224: 雪氷域補助曲線（凹地）

### line
- 4101: 道路
- 4151: 輸送管
- 7101: 特定地区界

### building
- 5101: 普通建物
- 5111: 普通無壁舎

### symbol
- 100: 注記 - 名称、名称（読み）、回転角度
- 2102: 三角点 - 標高（HYOUKOU）
- 2103: 水準点 - 標高(m)
- 6101: 高塔
- 6111: 電波塔
- 7201: アデリーペンギン繁殖地
- 7611: 記念碑
- 8103: 標高点 - 標高（HYOUKOU）、標高(m)
