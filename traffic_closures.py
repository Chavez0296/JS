import json
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point, LineString
import contextily as ctx
from datetime import datetime
from pandas import json_normalize
import matplotlib.pyplot as plt

# Load the JSON file
with open('C:/Users/luisc/Downloads/lcsStatusD07.json', 'r') as f:
    road_closures_data = json.load(f)

# Normalize the nested JSON to access relevant data
closures = road_closures_data["data"]

# Flatten the closure and timestamp information using json_normalize
normalized_data = []
for closure_entry in closures:
    closure = closure_entry['lcs']['closure']
    timestamp = closure['closureTimestamp']
    location = closure_entry['lcs']['location']
    
    normalized_data.append({
        'closureID': closure['closureID'],
        'typeOfClosure': closure['typeOfClosure'],
        'closureStartDate': timestamp['closureStartDate'],
        'closureEndDate': timestamp['closureEndDate'],
        'isClosureEndIndefinite': timestamp['isClosureEndIndefinite'],
        'beginLongitude': location['begin']['beginLongitude'],
        'beginLatitude': location['begin']['beginLatitude'],
        'endLongitude': location['end']['endLongitude'],
        'endLatitude': location['end']['endLatitude']
    })

# Convert the normalized data to a DataFrame
road_closures_df = pd.DataFrame(normalized_data)

# Convert closure start and end dates to datetime
road_closures_df['closureStartDate'] = pd.to_datetime(road_closures_df['closureStartDate'], errors='coerce')
road_closures_df['closureEndDate'] = pd.to_datetime(road_closures_df['closureEndDate'], errors='coerce')

# Get today's date
today = datetime.today()

# Filter for "Full" closures and active closures based on today's date
filtered_data = road_closures_df[
    (road_closures_df['typeOfClosure'] == 'Full') & 
    (road_closures_df['closureStartDate'] <= today) & 
    (road_closures_df['closureEndDate'] >= today) & 
    (road_closures_df['isClosureEndIndefinite'] != 'true')
]

# Create GeoDataFrame with road closure start and end locations
geometry = [
    LineString([
        (start_lon, start_lat),
        (end_lon, end_lat)
    ]) 
    for start_lon, start_lat, end_lon, end_lat in zip(
        filtered_data['beginLongitude'], 
        filtered_data['beginLatitude'],
        filtered_data['endLongitude'],
        filtered_data['endLatitude']
    )
]

gdf = gpd.GeoDataFrame(filtered_data, geometry=geometry)

# Set the CRS to WGS84 (latitude/longitude)
gdf.crs = "EPSG:4326"

# Plot the road closures on a map
fig, ax = plt.subplots(figsize=(10, 10))
gdf.plot(ax=ax, color='red', linewidth=2)  # Plot as lines

# Add basemap (OSM) for streets
ctx.add_basemap(ax, crs=gdf.crs.to_string(), source=ctx.providers.OpenStreetMap.Mapnik)

# Add labels and title for closures
plt.title('Active Full Road Closures Visualization with Streets')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.show()
