import requests
import json
from concurrent.futures import ThreadPoolExecutor, as_completed

# Define the base URL
base_url = "https://guildofguardians.mypinata.cloud/ipfs/QmYxaiewUDBYiSErWELNxYvEVRB7skUNJwz4knuENqkNFE/"

# Function to fetch data for a given itemID
def fetch_data(itemID):
    url = f"{base_url}{itemID}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            print(f'Retrieved NFT #{itemID} successfully.')
            return itemID, response.json()
        else:
            print(f"Failed to retrieve data for itemID {itemID}: {response.status_code}")
            return itemID, None
    except requests.exceptions.RequestException as e:
        print(f"Request failed for itemID {itemID}: {e}")
        return itemID, None

# Initialize an empty list to store the results
results = {}

# Use ThreadPoolExecutor to fetch data concurrently
with ThreadPoolExecutor(max_workers=10) as executor:
    future_to_itemID = {executor.submit(fetch_data, itemID): itemID for itemID in range(1, 10001)}
    for future in as_completed(future_to_itemID):
        itemID, data = future.result()
        if data:
            results[itemID] = data

# Save the results to avatars.json
with open('avatars.json', 'w') as json_file:
    json.dump(results, json_file, indent=4)

print("Data saved to avatars.json")
