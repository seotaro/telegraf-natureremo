# telegraf-natureremo

## Install

```bash
# Deploy exec
make deploy
```

## stdout

標準出力に計測値を所定のフォーマットで出力して Telegraf に取得させる。

time は API をたたいた時刻ではなく、API が返した created_at を返す。リファレンスには特に説明がないが、created_at は値が変化した時刻が入るようだ。

出力例）

```json
[{"sensor":"NatureRemo","id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","time":"2023-11-21T10:38:39Z","temperature":24.8},{"sensor":"NatureRemo","id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","time":"2023-11-21T12:12:06Z","humidity":48},{"sensor":"NatureRemo","id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","time":"2023-11-21T12:34:17Z","illumination":29},{"sensor":"NatureRemo","id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","time":"2023-11-21T06:37:07Z","movement":1},{"sensor":"NatureRemo","id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","time":"2023-11-21T12:40:09Z","temperature":24.6},{"sensor":"NatureRemo","id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","time":"2023-04-11T17:41:10Z","temperature":21.8}]
```

## /etc/telegraf/telegraf.conf

設定例）

```conf
[agent]
  interval = "30s"
  flush_interval = "30s"

[[outputs.influxdb_v2]]
  urls = ["http://{アドレス}:8086"]
  token = "{token}"
  organization = "{organization}"
  bucket = "{bucket}"

# Nature Remo
[[inputs.exec]]
  commands = [
    "node /usr/local/bin/telegraf-natureremo/index.js"
  ]

  environment = [
    "token={トークン}"
  ]

  timeout = "30s"

  data_format = "json"
  json_time_key = "time"
  json_time_format = "2006-01-02T15:04:05Z07:00"
  tag_keys = ["id", "sensor"]
```

## 参考

- Nature Remo
  - [NATURE](https://nature.global/)
  - [Nature Remo Cloud API](https://developer.nature.global/)
