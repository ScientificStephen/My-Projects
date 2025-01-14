# This Python 3 environment comes with many helpful analytics libraries installed
# It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# For example, here's several helpful packages to load

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

# Input data files are available in the read-only "../input/" directory
# For example, running this (by clicking run or pressing Shift+Enter) will list all files under the input directory

import os
for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))

# You can write up to 20GB to the current directory (/kaggle/working/) that gets preserved as output when you create a version using "Save & Run All"
# You can also write temporary files to /kaggle/temp/, but they won't be saved outside of the current session

# ==============================================================
# STEP 1: IMPORT NECESSARY LIBRARIES
# ==============================================================
import numpy as np
import pandas as pd
import os
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
import pickle
import nltk
from nltk.corpus import wordnet
import translators as ts  # <-- Using translators for translation
from langdetect import detect  # <-- Using langdetect for language detection
from textblob import TextBlob
import spacy
import logging
import random

# ==============================================================
# STEP 2: DOWNLOAD NECESSARY NLTK DATA AND LOAD spaCy MODEL
# ==============================================================
nltk.download('wordnet')
!python -m spacy download en_core_web_sm
nlp = spacy.load("en_core_web_sm")

# ==============================================================
# STEP 3: SET UP LOGGING
# ==============================================================
logging.basicConfig(filename='/content/chatbot.log', level=logging.INFO)

# ==============================================================
# STEP 4: DOWNLOAD AND LOAD THE DATASET
# ==============================================================
# Install Kaggle API and download the dataset
!pip install -q kaggle
from google.colab import files
files.upload()  # Upload your kaggle.json file
!mkdir -p ~/.kaggle
!cp kaggle.json ~/.kaggle/
!chmod 600 ~/.kaggle/kaggle.json
!kaggle datasets download -d bitext/bitext-gen-ai-chatbot-customer-support-dataset
!unzip bitext-gen-ai-chatbot-customer-support-dataset.zip

# Load the dataset
data = pd.read_csv('Bitext_Sample_Customer_Support_Training_Dataset_27K_responses-v11.csv')
print("Dataset Overview:")
print(data.head())
print("\nDataset Info:")
print(data.info())

# ==============================================================
# STEP 5: PREPROCESS THE DATA
# ==============================================================
# Drop rows with missing values in 'instruction', 'intent', or 'response' columns
data = data.dropna(subset=['instruction', 'intent', 'response'])

# Combine 'instruction' and 'response' columns for exploratory analysis
data['combined'] = data['instruction'] + " " + data['response']

# ==============================================================
# STEP 6: TRAIN-TEST SPLIT
# ==============================================================
X = data['instruction']  # Input (user queries)
y = data['intent']  # Labels (intents)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ==============================================================
# STEP 7: VECTORIZE TEXT DATA
# ==============================================================
vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# ==============================================================
# STEP 8: TRAIN INTENT CLASSIFICATION MODEL
# ==============================================================
model = LogisticRegression()
model.fit(X_train_tfidf, y_train)

# ==============================================================
# STEP 9: EVALUATE THE MODEL
# ==============================================================
predictions = model.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, predictions)
print("\nAccuracy:", accuracy)
print("\nClassification Report:")
print(classification_report(y_test, predictions))

# ==============================================================
# STEP 10: SAVE THE VECTORIZER AND MODEL FOR DEPLOYMENT
# ==============================================================
with open('vectorizer.pkl', 'wb') as vec_file:
    pickle.dump(vectorizer, vec_file)
with open('intent_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)
print("\nModel and vectorizer saved successfully.")

# ==============================================================
# STEP 11: ENHANCED MULTILINGUAL CHATBOT
# ==============================================================
def enhanced_chatbot(user_input, target_language="en"):
    # Step 1: Detect language
    detected_lang = detect(user_input)
    print(f"Detected language: {detected_lang}")

    # Step 2: Translate input to English (if necessary)
    if detected_lang != "en":
        user_input_en = ts.translate_text(user_input, to_language="en")
    else:
        user_input_en = user_input

    # Step 3: Extract entities
    entities = {ent.text: ent.label_ for ent in nlp(user_input_en).ents}
    print(f"Extracted entities: {entities}")

    # Step 4: Analyze sentiment
    sentiment = TextBlob(user_input_en).sentiment.polarity
    print(f"Sentiment: {'Positive' if sentiment > 0 else 'Negative' if sentiment < 0 else 'Neutral'}")

    # Step 5: Generate response
    user_input_tfidf = vectorizer.transform([user_input_en])
    intent = model.predict(user_input_tfidf)[0]
    confidence = model.predict_proba(user_input_tfidf).max()
    response_en = f"Detected intent: {intent}. How can I assist you further?" if confidence >= 0.5 else "I'm sorry, I didn't understand that. Can you please rephrase?"

    # Step 6: Translate response to target language
    if target_language != "en":
        response = ts.translate_text(response_en, to_language=target_language)
    else:
        response = response_en

    # Step 7: Log conversation
    logging.info(f"User Input: {user_input}, Response: {response}")

    return response

# ==============================================================
# STEP 12: EXAMPLE USAGE OF THE ENHANCED CHATBOT
# ==============================================================
# Example 1: Spanish input
user_input = "¿Cómo cancelo mi pedido?"
response = enhanced_chatbot(user_input, target_language="es")
print("Response:", response)

# Example 2: French input
user_input = "Quelle est la politique de remboursement ?"
response = enhanced_chatbot(user_input, target_language="fr")
print("Response:", response)

# Example 3: English input
user_input = "How do I track my order?"
response = enhanced_chatbot(user_input, target_language="en")
print("Response:", response)
