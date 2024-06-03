import ISO6391 from 'iso-639-1';

const languageOptions = ISO6391.getLanguages(ISO6391.getAllCodes()).map(
  (language) => ({
    label: language.name,
    value: language.code
  })
);

export default languageOptions;