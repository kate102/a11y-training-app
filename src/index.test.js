import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'


const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom
let container
describe('index.html', () => {
    beforeEach(() => {
    //   // Constructing a new JSDOM with this option is the key
    //   // to getting the code in the script tag to execute.
    //   // This is indeed dangerous and should only be done with trusted content.
    //   // https://github.com/jsdom/jsdom#executing-scripts
      dom = new JSDOM(html, { runScripts: 'dangerously' })
      container = dom.window.document.body;
    })

    it('renders a heading element', () => {
      expect(container.querySelector('h1')).not.toBeNull();
      expect(container.querySelector('h2')).not.toBeNull();
    })

    it('renders a has the correct landmarks', () => {
      expect(container.querySelector('header')).not.toBeNull();
      expect(container.querySelector('nav')).not.toBeNull();
      expect(container.querySelector('main')).not.toBeNull();
    })

    it('renders a skip link element', () => {
      expect(getByText(container, 'Skip to main content')).toBeInTheDocument();
      expect(getByText(container,'Skip to main content').closest('a')).toHaveAttribute('href', '#maincontent')
    })

    it('renders a nav bar', () => {
      expect(getByText(container, 'Start')).toBeInTheDocument();
      expect(getByText(container,'Start').closest('a')).toHaveAttribute('href', './pages/intro/the_facts.html')
    })

    it('content is correct', () => {
      expect(getByText(container, 'Walk In Their Shoes')).toBeInTheDocument();
      expect(getByText(container, 'Education Through Experience')).toBeInTheDocument();
    })
  
    // it('renders a button element', () => {
    //   expect(container.querySelector('button')).not.toBeNull()
    //   expect(getByText(container, 'Start')).toBeInTheDocument()
    // })

    // it('will redirect to the facts page', () => {
    //   dom.window.location.assign = jest.fn();
    //   const redirection = shallow(<Redirection />, {
    //     context: {
    //       router: {
    //         location: {
    //           pathname: '/wubbalubbadubdub',
    //         },
    //       },
    //     },
    //   });
    //   expect(window.location.assign).toBeCalledWith(`${CONFIG.APP_LEGACY_ROOT}`);
    // });
  })