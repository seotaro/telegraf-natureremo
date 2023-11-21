# telegraf-natureremo

## インストール

```bash
yarn
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

[[inputs.exec]]
  commands = [
    "node /usr/local/bin/telegraf-natureremo/index.js"
  ]

  environment = [
    "Token={トークン}"
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
