# tunci

[![Crowdin](https://badges.crowdin.net/tunci/localized.svg)](https://crowdin.com/project/tunci)

_tunci_ (トゥンチ) is a neural machine translator for the Ainu language — an indigenous language that originated in Northern Japan. It is designed to help Ainu learners easily look up words or check if their sentences are correct, thus contributing to the revitalization of the Ainu language.

## Papers

- Ryo Igarashi and So Miyagawa. 2024. [Enhancing Neural Machine Translation for Ainu-Japanese: A Comprehensive Study on the Impact of Domain and Dialect Integration](https://aclanthology.org/2024.nlp4dh-1.40/). In Proceedings of the 4th International Conference on Natural Language Processing for Digital Humanities, pages 413–422, Miami, USA. Association for Computational Linguistics.

## Features

- 🌍 **Translation**: Translate between Ainu and Japanese
- 🔤 **Romanization**: Convert Katakana script to Latin script
- 💬 **Conversation / Folklore**: You can select the context of the sentence to get a more accurate translation
- 📍 **Dialects**: You can select a dialect from nine different regions
- ✨ **Examples**: Get examples of how to use a word in a sentence
- 👯‍♀️ **Alternatives**: Get alternative translations for a word

## Tech Stack

- Machine Learning (implemented in [`aynumosir/ainu-lm`](https://github.com/aynumosir/ainu-lm))
  - mT5: A multilingual version of T5, a transformer-based model
  - Google Cloud Vertex AI: A managed machine learning platform
  - Hugging Face Transformers: A library for state-of-the-art NLP models
- Frontend
  - React + Next.js (/w Server Components): A frontend framework for building web applications
  - Radix UI: A design system for building accessible and responsive web applications
  - Vercel: A cloud platform for static sites and serverless functions

## License

MIT
