const cssLibEnum = {
  MUI: 'mui',
  TAILWIND: 'tailwind',
};

module.exports = {
  folder: 'presentation',
  cssLibEnum,
  cssLibs: [
    {
      value: cssLibEnum.MUI,
      name: 'Material-UI',
      dependencies: ['@material-ui/core', '@material-ui/icons'],
      devDependencies: [],
    },
    {
      value: cssLibEnum.TAILWIND,
      name: 'Tailwind CSS',
      dependencies: [],
      devDependencies: [
        'tailwindcss@latest',
        'postcss@latest',
        'autoprefixer@latest',
      ],
    },
  ],
  foldersToGitKeep: [
    '@types',
    'hooks',
    'components',
    'enums',
    'middlewares',
    'public',
    'utils',
    'schemas',
    'contexts',
    'data',
    'services',
  ],
};
