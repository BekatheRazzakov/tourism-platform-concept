import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3010',
      show: false,
      windowSize: '900x900'
    }
  },
  include: {
    I: './steps_file'
  },
  "gherkin": {
    "features": "./features/*.feature",
    "steps": [
      "./step_definitions/steps.ts"
    ]
  },
  name: 'test'
}