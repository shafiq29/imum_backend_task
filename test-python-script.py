
!pip install googletrans==3.1.0a0
import nltk
from nltk.tokenize import word_tokenize
from googletrans import Translator

# Download NLTK data (if not already installed)
nltk.download('punkt')

# Example text
text = "VICHY ampulės veidui nuo senėjimo LIFTACTIV PEPTIDE-C, 1,8 ml, N10"

# Initialize the translator
translator = Translator()

# Translate the text from Lithuanian to English
translated_text = translator.translate(text, src='lt', dest='en').text
print("Translated Text:", translated_text)

# Tokenize the translated text
tokens = word_tokenize(translated_text)
print("Tokens:", tokens)

# List of known manufacturers (you can expand this list)
manufacturers = ["VICHY", "LIFTACTIV", "PEPTIDE-C"]

# Detect the manufacturer in the original text
detected_manufacturer = None
for token in tokens:
    if token.upper() in manufacturers:
        detected_manufacturer = token.upper()
        break

if detected_manufacturer:
    print("Detected Manufacturer:", detected_manufacturer)
else:
    print("No manufacturer detected")




