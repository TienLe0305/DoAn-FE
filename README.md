# Chrome Extension Chatbot Assistant

This project is the frontend for a Chrome extension chatbot assistant, built using modern web technologies.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Google Chrome](https://www.google.com/chrome/)

## Project Structure

```
.
├── src
│   ├── background
│   ├── contentScript
│   ├── popup
│   ├── static
│   └── react-app-env.d.ts
├── .env_sample
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## Getting Started

Follow these instructions to set up and run the project in development mode.

### Clone the Repository

```bash
git clone https://github.com/TienLe0305/DoAn-FE
cd DoAn-FE
```

### Install Dependencies

Install the necessary npm packages:

```bash
npm install
```

### Environment Configuration

Copy the `.env_sample` file to `.env` and configure the environment variables as needed.

```bash
cp .env_sample .env
```

## Build the Project

### Development Build

To build the project for development, run:

```bash
npm run build
```

This will create a `build` directory with the built files.

## Load the Extension in Chrome

Follow these steps to load the extension in Chrome in development mode:

1. **Open Chrome and go to the Extensions page**

    Open Chrome and navigate to `chrome://extensions/` or click the menu icon (three dots) in the top right corner, then go to More tools > Extensions.

2. **Enable Developer Mode**

    In the top right corner of the Extensions page, enable the "Developer mode" toggle.

3. **Load Unpacked**

    Click the "Load unpacked" button and select the `build` directory of your project. This will load your extension in Chrome.

4. **Test the Extension**

    You should now see your extension's icon in the Chrome toolbar. Click the icon to open the extension and test its functionality.

## Troubleshooting

- If you encounter issues during the build process, make sure all dependencies are installed correctly and that you have the correct version of Node.js.
- Check the console for any errors or warnings during development and loading of the extension.
s
## Conclusion

This setup allows you to quickly build and test your Chrome extension chatbot assistant in development mode.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Google Chrome](https://www.google.com/chrome/)
