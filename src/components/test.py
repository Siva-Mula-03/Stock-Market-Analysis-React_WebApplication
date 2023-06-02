import pandas as pd
import datetime

data = pd.read_csv("market.csv", sep=',')

date = datetime.date(2014, 10, 6)
print(f"{date.day:02}-{date.month:02}-{date.year:04}")
c = 0
for i in range(data.shape[0]):
    c += 1
    print(f"{date.day:02}-{date.month:02}-{date.year:04}")
    data.loc[i, 'Date'] = f"{date.day:02}-{date.month:02}-{date.year:04}"
    if c == 10:
        c = 0
        date = date + datetime.timedelta(days=1)

data.to_csv("edited.csv")