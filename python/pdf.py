# Install the Google AI Python SDK
# $ pip install google-generativeai

# See the getting started guide for more information:
# https://ai.google.dev/gemini-api/docs/get-started/python

import os
import google.generativeai as genai

# Set up the API key
genai.configure(api_key=os.environ["GEMINI_KEY"])

# Define the model you want to use
model_name = "gemini-1.5-pro"

# Upload the file to the Google Generative AI service
sample_pdf = genai.upload_file("test.pdf")

# Create a prompt that includes the file reference for summarization
prompt = f"Give me a summary of this document: {sample_pdf}"

# Call the generate method with the prompt
response = genai.(
    model=model_name,
    prompt=prompt,
    temperature=0.7,
    max_tokens=1024
)

# Print the generated response text
print(f"Response Text: {response['text']}")
