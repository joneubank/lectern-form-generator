const config = {
  site: {
    title: process.env.SITE_TITLE || 'Schema Generated Form',
    description: process.env.SITE_DESCRIPTION || 'Create a structured TSV through form submission',
  },
  schema: {
    url: process.env.SCHEMA_URL,
    file: process.env.SCHEMA_FILE_PATH || '../../../resources/dictionaries/simple-dictionary.json',
  },
};
export default config;
