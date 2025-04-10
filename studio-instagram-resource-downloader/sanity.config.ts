import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {documentInternationalization} from '@sanity/document-internationalization' // Import the plugin
import autoTranslateAction from './document-actions/autoTranslateAction' // Import the auto-translate action

export default defineConfig({
  name: 'default',
  title: 'Instagram Resource Downloader',

  projectId: 'n9195iq3',
  dataset: 'production',

  plugins: [structureTool(), visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'es', title: 'Spanish'},
      ],
      schemaTypes: ['containSection'], // Add your schema type here
    }),
  ],

  document: {
    actions: (prev) => [
      ...prev,
      autoTranslateAction,
    ],
  },

  // document: {
  //   actions: (prev, context) => {
  //     const originalDoc = context.documentId; // Use documentId instead of document
  //     const targetLanguages = ['es', 'fr']; // Add your target languages here

  //     const translationActions = targetLanguages.map((lang) => {
  //       return autoTranslateAction(originalDoc, lang);
  //     });

  //     return [...prev, ...translationActions];
  //   },
  // },
  

  schema: {
    types: schemaTypes,
  },
})
