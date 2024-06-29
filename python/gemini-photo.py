"""
Install the Google AI Python SDK

$ pip install google-generativeai

See the getting started guide for more information:
https://ai.google.dev/gemini-api/docs/get-started/python
"""

# import os

# import google.generativeai as genai

# genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# def upload_to_gemini(path, mime_type=None):
#   """Uploads the given file to Gemini.

#   See https://ai.google.dev/gemini-api/docs/prompting_with_media
#   """
#   file = genai.upload_file(path, mime_type=mime_type)
#   print(f"Uploaded file '{file.display_name}' as: {file.uri}")
#   return file

# # Create the model
# # See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
# generation_config = {
#   "temperature": 2,
#   "top_p": 0.95,
#   "top_k": 64,
#   "max_output_tokens": 1024,
#   "response_mime_type": "text/plain",
# }

# model = genai.GenerativeModel(
#   model_name="gemini-1.5-flash",
#   generation_config=generation_config,
#   # safety_settings = Adjust safety settings
#   # See https://ai.google.dev/gemini-api/docs/safety-settings
# )

# # TODO Make these files available on the local file system
# # You may need to update the file paths
# files = [
#   upload_to_gemini("image_plant_care1.jpeg", mime_type="image/jpeg"),
#   upload_to_gemini("image_animal3.jpeg", mime_type="image/jpeg"),
# ]

# chat_session = model.start_chat(
#   history=[
#     {
#       "role": "user",
#       "parts": [
#         "Do you know what plant this is? How do I best take care of it? ",
#         files[0],
#         files[1],
#         "what is that",
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "The plant is a **Persian Shield Plant (Strobilanthes dyerianus)**. Here's how to take care of it: \n\n* **Light:** Bright, indirect light. Avoid direct sunlight as it can scorch the leaves.\n* **Water:** Water when the top inch of soil is dry. Avoid overwatering. \n* **Humidity:** This plant likes humid environments. You can place it on a pebble tray with water or mist the leaves regularly.\n* **Temperature:** Keep it in temperatures above 60°F. \n* **Soil:** Use well-draining potting mix. \n* **Fertilizer:** Feed with diluted liquid fertilizer every few weeks during the growing season. \n\nIt's worth noting that this plant is typically a seasonal grower and may lose its vibrant purple foliage in winter. However, with the right care, it will come back again in the spring. \n",
#       ],
#     },
#   ]
# )

# response = chat_session.send_message("INSERT_INPUT_HERE")

# print(response.text)

import os

print(os.environ["VAR_A"])