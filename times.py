import json
import pandas as pd
from datetime import datetime

with open("src/assets/data.json") as f:
    data = json.load(f)

events = data["data"]["events"]
df = pd.DataFrame(columns=["name", "start", "end"])
for event in events:
    name = event["name"]
    start_time = datetime.fromtimestamp(event["start_time"] / 1000.0)
    end_time = datetime.fromtimestamp(event["end_time"] / 1000.0)

    df = df.append({
        "name": event["name"],
        "start": start_time,
        "end": end_time
    }, ignore_index=True)

df = df.sort_values(by=["start", "end"])
print(df)