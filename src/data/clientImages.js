const clientImage = (key, id, widths, width, height, credit) => ({
  key,
  src: `/images/doctor/${id}-${Math.max(...widths)}.jpg`,
  srcSet: {
    webp: widths.map((size) => `/images/doctor/${id}-${size}.webp ${size}w`).join(', '),
    jpeg: widths.map((size) => `/images/doctor/${id}-${size}.jpg ${size}w`).join(', '),
  },
  width,
  height,
  credit,
});

export const doctorPortraits = {
  hero: clientImage('doctorHero', 'hero', [220, 400], 220, 275, null),
  office: clientImage('doctorOffice', 'office', [220, 400], 220, 275, null),
};

export const expertiseImages = [
  clientImage('brainNeurons', 'brain-neurons', [320, 480], 320, 240, 'Client-supplied image'),
  clientImage('brainNetwork', 'brain-network', [320, 480], 320, 240, 'Client-supplied image'),
  clientImage('spine', 'spine', [320, 480], 320, 240, 'Client-supplied image'),
  clientImage('imaging', 'imaging', [320, 480], 320, 240, 'Client-supplied image'),
  clientImage('surgery', 'surgery', [320, 480], 320, 240, 'Client-supplied image'),
];

export default { doctorPortraits, expertiseImages };
