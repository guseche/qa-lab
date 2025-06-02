# QA Lab

A web-based quality assurance testing laboratory for running and managing tests.

## Features

- Run automated tests
- View test results
- Configure test settings
- Generate test reports

## Getting Started

1. Open `index.html` in your web browser
2. Navigate through the different sections using the navigation menu
3. Configure your settings in the Settings section
4. Run tests using the "Run All Tests" button

## Project Structure

```
qa-lab/
├── index.html
├── README.md
├── .gitignore
├── package.json (opcional para herramientas de desarrollo)
│
├── src/
│   ├── js/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── header.js
│   │   │   ├── footer.js
│   │   │   └── modal.js
│   │   ├── services/            # Lógica de negocio y APIs
│   │   │   ├── api.js
│   │   │   ├── storage.js
│   │   │   └── validation.js
│   │   ├── utils/               # Utilidades y helpers
│   │   │   ├── helpers.js
│   │   │   ├── constants.js
│   │   │   └── dom.js
│   │   ├── pages/               # Scripts específicos por página
│   │   │   ├── home.js
│   │   │   ├── about.js
│   │   │   └── contact.js
│   │   └── main.js              # Punto de entrada principal
│   │
│   ├── css/
│   │   ├── base/                # Estilos base
│   │   │   ├── reset.css
│   │   │   ├── typography.css
│   │   │   └── variables.css
│   │   ├── components/          # Estilos de componentes
│   │   │   ├── buttons.css
│   │   │   ├── forms.css
│   │   │   ├── cards.css
│   │   │   └── modals.css
│   │   ├── layout/              # Estilos de layout
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   ├── sidebar.css
│   │   │   └── grid.css
│   │   ├── pages/               # Estilos específicos por página
│   │   │   ├── home.css
│   │   │   ├── about.css
│   │   │   └── contact.css
│   │   ├── utilities/           # Clases utilitarias
│   │   │   ├── spacing.css
│   │   │   ├── colors.css
│   │   │   └── responsive.css
│   │   └── main.css             # Archivo principal que importa todo
│   │
│   └── html/                    # Templates o páginas adicionales
│       ├── pages/
│       │   ├── about.html
│       │   ├── contact.html
│       │   └── services.html
│       └── partials/            # Fragmentos reutilizables
│           ├── header.html
│           ├── footer.html
│           └── nav.html
│
├── assets/
│   ├── images/
│   │   ├── icons/
│   │   ├── logos/
│   │   └── photos/
│   ├── fonts/
│   ├── videos/
│   └── documents/
│
├── tests/                       # Tests unitarios y de integración
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── docs/                        # Documentación del proyecto
    ├── setup.md
    ├── deployment.md
    └── api.md
```

## Usage

### Running Tests
- Click "Run All Tests" to execute all available tests
- View results in the test results panel
- Clear results using the "Clear Results" button

### Settings
- Configure API URL for external service tests
- Set timeout values for test execution
- Settings are saved in local storage

## Development

To run with live-server:
```bash
npm install
npm start
```

## Contributing

Feel free to add new tests or improve the existing functionality.