import { useEffect, useState } from 'react'
import './App.css'
import Hero from './Components/Hero/Hero'
import About from './Components/About/About'
import Skills from './Components/Skills/Skills2'
import Footer from './Components/Footer/Footer'
import Projects2 from './Components/Projects/Projects'
import Contact from './Components/Contact/Contact'
import axios from 'axios'
import ToTheTop from '@mui/icons-material/PanToolAlt';
const url = import.meta.env.VITE_URL;

function App() {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2400 });
  }, []);


  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        const response = await axios.get(`${url}/cells/F2`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (response.data && response.data.F2) {
          const newVisitorCount = parseInt(response.data.F2) + 1;
          await axios.patch(`${url}/id/0`, {
            data: {
              'visitor_count': newVisitorCount
            }
          }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
        } else {
          console.error('Error receiving visitor count');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    updateVisitorCount();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='font-defall'>
      {/* Hero section */}
      <Hero />

      {/* About section */}
      <About />

      {/* Skills section */}
      <Skills />

      {/* Projects section */}
      {/* <Projects /> */}
      <Projects2 />

      {/* Footer section */}
      <Contact />

      {/* Footer section */}
      <Footer />
      {showButton && (
        <button
          id="scrollToTopButton"
          className="fixed bottom-2 right-2 md:bottom-5 md:right-5 bg-cyan-400 text-fill-transparent p-3 rounded-full shadow-black shadow-md duration-300 opacity-80
          hover:-translate-y-1 hover:transition-all
          active:shadow-none active:translate-y-1"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ToTheTop />
        </button>
      )}
    </div>
  )
}

export default App
