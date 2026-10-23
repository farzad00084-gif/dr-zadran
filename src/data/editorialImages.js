const img = (key, id, widths, width, height, credit) => ({
  key,
  src: `/images/editorial/${id}-${widths.at(-1)}.jpg`,
  srcSet: {
    webp: widths.map((w) => `/images/editorial/${id}-${w}.webp ${w}w`).join(', '),
    jpeg: widths.map((w) => `/images/editorial/${id}-${w}.jpg ${w}w`).join(', '),
  },
  width,
  height,
  credit,
});

const unsplashLicense = {
  label: 'Unsplash License',
  url: 'https://unsplash.com/license',
};

export const editorialImages = {
  instrumentStudy: img(
    'instrumentStudy',
    'instrument-study',
    [480, 800, 1200],
    1200,
    1500,
    {
      label: 'Wellcome Collection',
      url: 'https://commons.wikimedia.org/wiki/File:Horsley-type_skull_saw,_London,_England,_1900-1926_Wellcome_L0057852.jpg',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    }
  ),
  neuroimaging: img(
    'neuroimaging',
    'neuroimaging',
    [600, 1200, 1800],
    1800,
    1200,
    {
      label: 'National Cancer Institute',
      url: 'https://unsplash.com/photos/a-black-and-white-photo-of-various-mri-images-BDKid0yJcAk',
      license: unsplashLicense.label,
      licenseUrl: unsplashLicense.url,
    }
  ),
  microscope: img(
    'microscope',
    'microscope',
    [480, 800, 1200],
    1200,
    1500,
    {
      label: 'Yassine Khalfalli',
      url: 'https://unsplash.com/photos/black-microscope-jvds0vzO4IQ',
      license: unsplashLicense.label,
      licenseUrl: unsplashLicense.url,
    }
  ),
  hospitalInterior: img(
    'hospitalInterior',
    'hospital-interior',
    [600, 900, 1400],
    1400,
    1050,
    {
      label: 'Tasha Kostyuk',
      url: 'https://unsplash.com/photos/empty-hospital-corridor-with-benches-and-doors-Pk-KuizxQv8',
      license: unsplashLicense.label,
      licenseUrl: unsplashLicense.url,
    }
  ),
};
