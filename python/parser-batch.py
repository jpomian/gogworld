import json

# Define the filters
filters = [
    {"trait_type": "Background", "value": "Gold"},
    {"trait_type": "Hair", "value": "Crown"}
]

# Load the original JSON data
with open('avatars.json', 'r') as file:
    data = json.load(file)

# Function to filter the data
def filter_data(data, filters):
    filtered_data = {}
    for key, item in data.items():
        attributes = item.get("attributes", [])
        if all(any(attr.get("trait_type") == f["trait_type"] and attr.get("value") == f["value"] for attr in attributes) for f in filters):
            filtered_data[key] = item
    return filtered_data

# Filter the data
filtered_data = filter_data(data, filters)

# Write the filtered data to results.json
with open('results.json', 'w') as file:
    json.dump(filtered_data, file, indent=4)

print("Filtered data has been written to results.json")